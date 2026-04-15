"""
1. Add paywall to 7 unlocked psychology trial pages (cognitive vol1-6, growth vol1)
2. Fix ALL "← 回到驚喜角落" back links → series guide pages (not homepage)

Psychology series guides:
  dark-psychology-vol*        → /dark-psychology.html
  cognitive-psychology-vol*   → /cognitive-psychology.html
  growth-psychology-vol*      → /growth-psychology.html
  personality-psychology-vol* → /personality-psychology.html
  relationship-psychology-vol* → /relationship-psychology.html
  subconscious-psychology-vol* → /unconscious-psychology.html

That-feeling trial pages:
  that-feeling-1-vol*-trial → /that-feeling-1.html
  that-feeling-2-vol*-trial → /that-feeling-2.html
  ... etc.
  that-feeling-1.html (series guide) → /that-feeling.html
"""
import os, re

PUBLIC = r'C:\Users\user\Desktop\MyProjects01\surprise-corner-src\public'

# ── PART 1: PAYWALL INSERTION ─────────────────────────────────────────────

# Cognitive vol1-6 use dark blue theme
DARK_PAYWALL_CSS = """
  /* ── PAYWALL ── */
  .paywall-fade { height: 100px; background: linear-gradient(to bottom, transparent, var(--bg)); margin-top: -60px; position: relative; z-index: 10; pointer-events: none; }
  .paywall-box { margin: 0 0 80px; padding: 48px 40px; background: var(--bg2); border: 1px solid var(--border); border-top: 2px solid var(--accent); text-align: center; position: relative; z-index: 10; }
  .paywall-lock { font-size: 2rem; margin-bottom: 16px; }
  .paywall-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 300; color: var(--text); margin-bottom: 12px; }
  .paywall-desc { font-size: 0.92rem; color: var(--text-muted); line-height: 1.9; margin-bottom: 24px; max-width: 420px; margin-left: auto; margin-right: auto; }
  .paywall-price { font-family: 'Space Mono', monospace; font-size: 1.3rem; color: var(--accent); margin-bottom: 24px; letter-spacing: 2px; }
  .paywall-btn { display: inline-block; padding: 13px 36px; background: var(--accent); color: #050a10; font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; font-weight: 700; transition: background 0.2s; margin-bottom: 16px; }
  .paywall-btn:hover { background: #7dd5f0; }
  .paywall-note { font-size: 0.8rem; color: var(--text-muted); }
  .paywall-note a { color: var(--accent); text-decoration: none; }
"""

# Growth vol1 uses light paper theme
LIGHT_PAYWALL_CSS = """
  /* ── PAYWALL ── */
  .paywall-fade { height: 100px; background: linear-gradient(to bottom, transparent, #f5f0e8); margin-top: -60px; position: relative; z-index: 10; pointer-events: none; }
  .paywall-box { margin: 48px 0 80px; padding: 48px 40px; background: rgba(26,122,94,0.07); border: 1px solid rgba(26,122,94,0.25); border-top: 2px solid #1a7a5e; text-align: center; border-radius: 2px; }
  .paywall-lock { font-size: 2rem; margin-bottom: 16px; }
  .paywall-title { font-size: 1.3rem; font-weight: 500; color: #1a1a2e; margin-bottom: 12px; letter-spacing: 2px; }
  .paywall-desc { font-size: 0.92rem; color: #5a5a6a; line-height: 1.9; margin-bottom: 24px; max-width: 420px; margin-left: auto; margin-right: auto; }
  .paywall-price { font-size: 1.3rem; color: #1a7a5e; margin-bottom: 24px; font-weight: 700; }
  .paywall-btn { display: inline-block; padding: 13px 36px; background: #1a7a5e; color: #fff; font-family: 'Noto Sans TC', sans-serif; font-size: 14px; letter-spacing: 2px; text-decoration: none; font-weight: 500; transition: background 0.2s; margin-bottom: 16px; border-radius: 2px; }
  .paywall-btn:hover { background: #155f4a; }
  .paywall-note { font-size: 0.8rem; color: #888; }
  .paywall-note a { color: #1a7a5e; text-decoration: none; }
"""

def make_paywall_html(product_id, price='NT$ 199', chapters=6, series_guide='/cognitive-psychology.html', series_name='認知心理學'):
    return f"""
  <!-- PAYWALL -->
  <div class="paywall-fade"></div>
  <div class="paywall-box">
    <div class="paywall-lock">🔒</div>
    <h3 class="paywall-title">繼續閱讀完整版</h3>
    <p class="paywall-desc">試閱到這裡。完整版收錄全 {chapters} 章，請至小舖購買完整版電子書。</p>
    <div class="paywall-price">{price}</div>
    <a href="https://still-time-corner.vercel.app/digital/{product_id}" class="paywall-btn" target="_blank">前往小舖購買完整版 →</a>
    <p class="paywall-note">購買後到 <a href="https://still-time-corner.vercel.app/my-purchases" target="_blank">我的購買</a> 自助下載 ・ <a href="{series_guide}">← 回到{series_name}導讀</a></p>
  </div>

"""

PAYWALL_FILES = [
    {
        'file': 'cognitive-psychology-vol1.html',
        'product_id': '69d7c0040b6f5888174c9f30',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'cognitive-psychology-vol2.html',
        'product_id': '69d7c0040b6f5888174c9f31',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'cognitive-psychology-vol3.html',
        'product_id': '69d7c0040b6f5888174c9f32',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'cognitive-psychology-vol4.html',
        'product_id': '69d7c0040b6f5888174c9f33',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'cognitive-psychology-vol5.html',
        'product_id': '69d7c0040b6f5888174c9f34',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'cognitive-psychology-vol6.html',
        'product_id': '69d7c0040b6f5888174c9f35',
        'css': 'dark',
        'series_guide': '/cognitive-psychology.html',
        'series_name': '認知心理學',
    },
    {
        'file': 'growth-psychology-vol1.html',
        'product_id': '69d7c0040b6f5888174c9f36',
        'css': 'light',
        'series_guide': '/growth-psychology.html',
        'series_name': '成長心理學',
    },
]

def find_ch2_insertion(content):
    """Find index to insert paywall (just before chapter 2 marker)."""
    # Priority 1: explicit comment markers
    for marker in ['<!-- 第二章 -->', '<!-- ── 第二章 ── -->', '<!--第二章-->']:
        idx = content.find(marker)
        if idx != -1:
            return idx

    # Priority 2: id="ch2" — find the start of the line/block containing it
    m = re.search(r'id=["\']ch2["\']', content)
    if m:
        # Back up to the start of the tag or preceding blank line
        start = m.start()
        # Find the < that opens this tag
        tag_start = content.rfind('<', 0, start)
        if tag_start != -1:
            # Check for blank line before tag
            before = content[:tag_start]
            nl = before.rfind('\n\n')
            if nl != -1 and nl > tag_start - 200:
                return nl + 1  # after the double newline
            return tag_start
    return None

updated = 0
for info in PAYWALL_FILES:
    path = os.path.join(PUBLIC, info['file'])
    with open(path, encoding='utf-8') as f:
        content = f.read()

    if 'paywall' in content:
        print(f'  SKIP (already has paywall): {info["file"]}')
        continue

    # 1. Add CSS before </style>
    paywall_css = DARK_PAYWALL_CSS if info['css'] == 'dark' else LIGHT_PAYWALL_CSS
    if '</style>' in content:
        content = content.replace('</style>', paywall_css + '</style>', 1)

    # 2. Find insertion point and add HTML
    paywall_html = make_paywall_html(
        info['product_id'],
        series_guide=info['series_guide'],
        series_name=info['series_name'],
    )
    idx = find_ch2_insertion(content)
    if idx is not None:
        content = content[:idx] + paywall_html + content[idx:]
        print(f'  OK paywall: {info["file"]} (inserted at pos {idx})')
    else:
        print(f'  WARNING: could not find ch2 insertion point in {info["file"]}')

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    updated += 1

print(f'\nPaywall: {updated} files updated\n')


# ── PART 2: FIX BACK LINKS ────────────────────────────────────────────────

# Map filename pattern → correct back URL + label
BACK_LINK_MAP = [
    # Psychology series vol pages
    (r'^dark-psychology-vol\d+\.html$',           '/dark-psychology.html',           '暗黑心理學導讀'),
    (r'^cognitive-psychology-vol\d+\.html$',       '/cognitive-psychology.html',       '認知心理學導讀'),
    (r'^growth-psychology-vol\d+\.html$',          '/growth-psychology.html',          '成長心理學導讀'),
    (r'^personality-psychology-vol\d+\.html$',     '/personality-psychology.html',     '人格心理學導讀'),
    (r'^relationship-psychology-vol\d+\.html$',    '/relationship-psychology.html',    '關係心理學導讀'),
    (r'^subconscious-psychology-vol\d+\.html$',    '/unconscious-psychology.html',     '潛意識心理學導讀'),
    # Psychology series guide pages → main psychology guide
    (r'^(dark|cognitive|growth|personality|relationship|unconscious|subconscious)-psychology\.html$',
                                                   '/psychology-guide.html',           '心理學導讀'),
    # That-feeling vol trial pages → series guide
    (r'^that-feeling-(\d+)-vol\d+-trial\.html$',   None,                              None),  # handled specially
    (r'^that-feeling-(\d+)-vol\d+-en-trial\.html$', None,                             None),  # handled specially
    # That-feeling series guides → main that-feeling page
    (r'^that-feeling-\d+\.html$',                  '/that-feeling.html',               '那個感覺'),
]

# Patterns to replace (all go to href="/")
HOMEPAGE_PATTERNS = [
    # encoded 回到驚喜角落
    r'href="/"([^>]*>)\s*(?:&larr;|←)\s*(?:&#22238;&#21040;&#39511;&#21916;&#35282;&#33853;|回到驚喜角落)',
    r'href="/"([^>]*)>\s*(?:&larr;|←)\s*(?:&#22238;&#21040;&#39511;&#21916;&#35282;&#33853;|回到驚喜角落)',
]

fix_count = 0
all_html = [f for f in os.listdir(PUBLIC) if f.endswith('.html')]

for fname in sorted(all_html):
    path = os.path.join(PUBLIC, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    original = content
    back_url = None
    back_label = None

    # Find the right back URL for this file
    for pattern, url, label in BACK_LINK_MAP:
        m = re.match(pattern, fname)
        if m:
            if url is None:
                # That-feeling trial: extract series number
                series_num = m.group(1)
                back_url = f'/that-feeling-{series_num}.html'
                back_label = f'那個感覺系列{series_num}導讀'
            else:
                back_url = url
                back_label = label
            break

    if back_url is None:
        continue  # not a file we care about

    # Replace href="/" back links in this file
    # Pattern: href="/" with text containing 回到驚喜角落 (plain or HTML-encoded)
    def replace_back(m):
        full = m.group(0)
        # Replace just the href="/"
        return full.replace('href="/"', f'href="{back_url}"', 1)

    # Match the full <a> tag
    new_content = re.sub(
        r'<a\s+href="/"\s[^>]*>(?:[^<]*(?:回到驚喜角落|&#22238;&#21040;&#39511;&#21916;&#35282;&#33853;)[^<]*)</a>',
        replace_back,
        content
    )

    # Also match simpler inline style patterns
    new_content = re.sub(
        r'(<a href=")/(")([^>]*>(?:[^<]*(?:回到驚喜角落|&#22238;&#21040;&#39511;&#21916;&#35282;&#33853;)[^<]*</a>))',
        lambda m: m.group(1) + back_url + m.group(2) + m.group(3),
        new_content
    )

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'  OK back-link: {fname} → {back_url}')
        fix_count += 1

print(f'\nBack-links: {fix_count} files fixed')
print('\nAll done!')
