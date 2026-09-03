import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const previousReport = await fs.readFile(path.join(root, 'buffer_link_analysis_report.md'), 'utf8').catch(() => '');
const previousSummaryText = await fs.readFile(path.join(root, 'buffer_link_group_summary.csv'), 'utf8').catch(() => '');
const csvLine = line => [...line.matchAll(/(?:^|,)(?:"((?:"")*[\s\S]*?)"|([^,]*))/g)].map(match => (match[1] ?? match[2] ?? '').replaceAll('""', '"'));
const previousSummaryLines = previousSummaryText.trim().split(/\r?\n/);
const previousSummary = new Map();
if (previousSummaryLines.length >= 2) {
  const headers = csvLine(previousSummaryLines[0]);
  for (const line of previousSummaryLines.slice(1)) {
    const values = csvLine(line);
    const row = Object.fromEntries(headers.map((key, index) => [key, values[index] ?? '']));
    if (row.group) previousSummary.set(row.group, row);
  }
}
const previousCounts = previousReport.match(/總貼文數：(\d+)；本文含連結：(\d+)；本文不含連結：(\d+)/);
const envText = await fs.readFile(path.join(root, '.env.local'), 'utf8');
const env = Object.fromEntries(envText.split(/\r?\n/).map(line => {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  return match ? [match[1], match[2].replace(/^['"]|['"]$/g, '')] : [];
}).filter(([key]) => key));
if (!env.BUFFER_API_KEY) throw new Error('SS .env.local 缺少 BUFFER_API_KEY');

async function gql(query, variables = {}) {
  const response = await fetch('https://api.buffer.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${env.BUFFER_API_KEY}` },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors?.length) throw new Error(JSON.stringify(payload.errors ?? payload));
  return payload.data;
}

const account = await gql(`query { account { organizations { id name } } }`);
const organization = account.account.organizations[0];
if (!organization) throw new Error('Buffer 帳號沒有可用 organization');
const channelsData = await gql(`query($organizationId: OrganizationId!) { channels(input: { organizationId: $organizationId }) { id name displayName service } }`, { organizationId: organization.id });
const wanted = channelsData.channels.filter(channel => ['facebook', 'instagram', 'threads'].includes(String(channel.service).toLowerCase()));
if (wanted.length !== 3) throw new Error(`預期 Facebook / Instagram / Threads 三個管道，實得 ${wanted.map(x => x.service).join(', ') || '0 個'}`);

const query = `query($organizationId: OrganizationId!, $channelIds: [ChannelId!]!, $after: String) {
  posts(first: 100, after: $after, input: { organizationId: $organizationId, filter: { status: [sent], channelIds: $channelIds } }) {
    edges { node { id text dueAt createdAt channelId metrics { type name value unit } metricsUpdatedAt } }
    pageInfo { endCursor hasNextPage }
  }
}`;
let after = null, all = [];
do {
  const data = await gql(query, { organizationId: organization.id, channelIds: wanted.map(x => x.id), after });
  all.push(...data.posts.edges.map(edge => edge.node));
  after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
} while (after);

const channelById = new Map(wanted.map(channel => [channel.id, channel]));
const metricValue = (metrics, name) => {
  const found = (metrics ?? []).find(metric => String(metric.name ?? metric.type).replace(/[^a-z]/gi, '').toLowerCase() === name.toLowerCase());
  const n = found && Number(found.value);
  return Number.isFinite(n) ? n : null;
};
const esc = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const day = value => value ? new Date(value).toISOString().slice(0, 10) : '';
const posts = all.map(post => {
  const channel = channelById.get(post.channelId);
  const text = post.text ?? '';
  return {
    id: post.id, platform: channel.service, channelName: channel.displayName || channel.name, publishedAt: post.dueAt || post.createdAt,
    date: day(post.dueAt || post.createdAt), text, hasLink: /(?:https?:\/\/|www\.)/i.test(text), metricsUpdatedAt: post.metricsUpdatedAt || '',
    engagementRate: metricValue(post.metrics, 'engagementRate'), impressions: metricValue(post.metrics, 'impressions'),
    views: metricValue(post.metrics, 'views'), reach: metricValue(post.metrics, 'reach'), clicks: metricValue(post.metrics, 'clicks'),
  };
}).sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

const columns = ['id','platform','channelName','publishedAt','date','hasLink','engagementRate','impressions','views','reach','clicks','metricsUpdatedAt','text'];
await fs.writeFile(path.join(root, 'buffer_posts_raw.csv'), [columns.join(','), ...posts.map(post => columns.map(key => esc(post[key])).join(','))].join('\n') + '\n', 'utf8');

const metrics = ['engagementRate','impressions','views','reach','clicks'];
const average = values => { const usable = values.filter(value => Number.isFinite(value)); return { n: usable.length, value: usable.length ? usable.reduce((a,b) => a+b, 0) / usable.length : null }; };
const groups = [false, true].map(hasLink => {
  const sample = posts.filter(post => post.hasLink === hasLink);
  const result = { group: hasLink ? '本文含連結' : '本文不含連結', postCount: sample.length };
  for (const metric of metrics) { const item = average(sample.map(post => post[metric])); result[`${metric}_n`] = item.n; result[metric] = item.value; }
  return result;
});
const summaryColumns = ['group','postCount',...metrics.flatMap(metric => [`${metric}_n`,metric])];
await fs.writeFile(path.join(root, 'buffer_link_group_summary.csv'), [summaryColumns.join(','), ...groups.map(row => summaryColumns.map(key => esc(row[key] == null ? '' : row[key])).join(','))].join('\n') + '\n', 'utf8');

const keyword = '情緒勒索';
const matching = posts.filter(post => post.text.includes(keyword));
const keywordDates = new Set(matching.map(post => post.date));
const keywordPosts = posts.filter(post => keywordDates.has(post.date) && (post.text.includes(keyword) || post.platform.toLowerCase() === 'threads'))
  .map(post => ({ ...post, includedReason: post.text.includes(keyword) ? '本文含「情緒勒索」' : '同日同故事（Threads 納入）' }));
const keyColumns = ['date','platform','channelName','publishedAt','includedReason','hasLink','engagementRate','impressions','views','reach','clicks','text'];
await fs.writeFile(path.join(root, 'buffer_keyword_posts.csv'), [keyColumns.join(','), ...keywordPosts.map(post => keyColumns.map(key => esc(post[key])).join(','))].join('\n') + '\n', 'utf8');

const fmt = value => value == null ? '—' : (Math.abs(value) < 1 ? value.toFixed(4) : value.toFixed(2));
const metricTable = ['| 分組 | 貼文數 | engagementRate（n） | impressions（n） | views（n） | reach（n） | clicks（n） |','|---|---:|---:|---:|---:|---:|---:|', ...groups.map(row => `| ${row.group} | ${row.postCount} | ${fmt(row.engagementRate)}（${row.engagementRate_n}） | ${fmt(row.impressions)}（${row.impressions_n}） | ${fmt(row.views)}（${row.views_n}） | ${fmt(row.reach)}（${row.reach_n}） | ${fmt(row.clicks)}（${row.clicks_n}） |`)];
const keywordTable = keywordPosts.length ? ['| 日期 | 平台 | 納入原因 | 是否含連結 | engagementRate | impressions | views |','|---|---|---|---|---:|---:|---:|', ...keywordPosts.map(p => `| ${p.date} | ${p.platform} | ${p.includedReason} | ${p.hasLink ? '是' : '否'} | ${fmt(p.engagementRate)} | ${fmt(p.impressions)} | ${fmt(p.views)} |`)] : ['沒有找到本文含「情緒勒索」的已發布貼文。'];
const staleThreshold = Date.now() - 3 * 24 * 60 * 60 * 1000;
const stale = posts.filter(post => !post.metricsUpdatedAt || Number.isNaN(Date.parse(post.metricsUpdatedAt)) || Date.parse(post.metricsUpdatedAt) < staleThreshold);
const allMissing = wanted.filter(channel => metrics.every(metric => posts.filter(post => post.channelName === (channel.displayName || channel.name)).every(post => post[metric] == null))).map(channel => channel.service);
const alerts = [
  ...(previousCounts && posts.length < Number(previousCounts[1]) ? [`總貼文數由上次的 ${previousCounts[1]} 降至 ${posts.length}。`] : []),
  ...groups.filter(group => group.postCount < 3).map(group => `${group.group}樣本數僅 ${group.postCount}（低於 3）。`),
  ...(allMissing.length ? [`以下平台全部五項指標皆缺值：${allMissing.join('、')}。`] : []),
  ...metrics.filter(metric => posts.every(post => post[metric] == null)).map(metric => `所有平台的 ${metric} 均未提供有效值。`),
  ...(stale.length ? [`${stale.length}/${posts.length} 則貼文的 metricsUpdatedAt 為空或超過 3 天前。`] : []),
];
const direction = (before, after) => {
  if (!Number.isFinite(before) || !Number.isFinite(after)) return '無法比較';
  if (after > before) return '上升';
  if (after < before) return '下降';
  return '持平';
};
const comparison = previousCounts && previousSummary.size === 2
  ? [
      `以前次報告為基準：總貼文數 ${previousCounts[1]} → ${posts.length}（${direction(Number(previousCounts[1]), posts.length)}）；本文含連結 ${previousCounts[2]} → ${groups[1].postCount}（${direction(Number(previousCounts[2]), groups[1].postCount)}）；本文不含連結 ${previousCounts[3]} → ${groups[0].postCount}（${direction(Number(previousCounts[3]), groups[0].postCount)}）。`,
      ...groups.map(group => {
        const prior = previousSummary.get(group.group);
        const items = ['engagementRate', 'impressions', 'views'].map(metric => {
          const before = Number(prior?.[metric]);
          const after = group[metric];
          return `${metric} ${Number.isFinite(before) && after != null ? `${direction(before, after)}（${fmt(before)} → ${fmt(after)}）` : '無有效可比平均值'}`;
        });
        return `${group.group}：${items.join('；')}。`;
      }),
    ].join('\n\n')
  : '找不到可完整稽核的前次報告與摘要 CSV，因此本次無法逐欄比較。';
const report = `# Buffer 貼文連結成效分析\n\n更新時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false })}（Asia/Taipei）  \n資料來源：Buffer GraphQL API；範圍為 Facebook、Instagram、Threads 的所有已發布貼文。\n\n## 整體結果\n\n總貼文數：${posts.length}；本文含連結：${groups[1].postCount}；本文不含連結：${groups[0].postCount}。\n\n${metricTable.join('\n')}\n\n說明：每個平均值只採計有該指標的貼文；括號為該指標的有效樣本數 n。\n\n## 「情緒勒索」同日跨平台貼文\n\n${keywordTable.join('\n')}\n\n## 與上次比較\n\n${comparison}\n\n## 異常或注意事項\n\n${alerts.length ? alerts.map(item => `- ${item}`).join('\n') : '- 未偵測到規則指定的明顯異常。'}\n\n## 產出檔案\n\n- buffer_posts_raw.csv：逐則原始貼文與指標。\n- buffer_link_group_summary.csv：連結分組統計。\n- buffer_keyword_posts.csv：「情緒勒索」及同日 Threads 對照貼文。\n`;
await fs.writeFile(path.join(root, 'buffer_link_analysis_report.md'), report, 'utf8');
console.log(JSON.stringify({ total: posts.length, link: groups[1].postCount, noLink: groups[0].postCount, alerts, keywordPosts: keywordPosts.length }));
