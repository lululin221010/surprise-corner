"""
Update stale 'coming soon / 即將上線 / 撰寫中' states to actual links.

Files to fix:
  that-feeling-1.html  - vol2 full "coming", vol3-6 trial "coming"
  that-feeling-2.html  - vol2-6 "即將上線"
  that-feeling-3.html  - vol2-6 "即將上線" (links exist but have wrong class/text)
  cognitive-psychology.html - Vol.2 "即將推出" span
"""
import re

PUBLIC = r'C:\Users\user\Desktop\MyProjects01\surprise-corner-src\public'
import os

# ── that-feeling-1.html ─────────────────────────────────────────────────────
path = os.path.join(PUBLIC, 'that-feeling-1.html')
with open(path, encoding='utf-8') as f:
    txt = f.read()

orig = txt

# Vol.2: remove "完整版即將上線" span (no full file exists; trial link is already there)
txt = txt.replace(
    '\n        <span class="vol-btn coming">完整版即將上線</span>',
    ''
)

# Vol.3: replace "試閱即將上線" span → real trial link
txt = txt.replace(
    '''    <div class="book-card">
      <div class="book-vol">Vol.3</div>
      <div class="book-title">《睡著之後你去了哪裡》</div>
      <div class="book-desc">夢境、清醒夢、睡眠意識狀態——你以為你在睡覺，但你的意識從沒有停止。</div>
      <div class="book-actions">
        <span class="vol-btn coming">試閱即將上線</span>
      </div>
    </div>''',
    '''    <div class="book-card">
      <div class="book-vol">Vol.3</div>
      <div class="book-title">《睡著之後你去了哪裡》</div>
      <div class="book-desc">夢境、清醒夢、睡眠意識狀態——你以為你在睡覺，但你的意識從沒有停止。</div>
      <div class="book-actions">
        <a href="/that-feeling-1-vol3-trial.html" class="vol-btn trial">試閱</a>
      </div>
    </div>'''
)

# Vol.4
txt = txt.replace(
    '''    <div class="book-card">
      <div class="book-vol">Vol.4</div>
      <div class="book-title">《另一個人的記憶》</div>
      <div class="book-desc">前世記憶案例、身份滲透、意識轉移——如果記憶可以跨越個體，「我」是誰的問題就更大了。</div>
      <div class="book-actions">
        <span class="vol-btn coming">試閱即將上線</span>
      </div>
    </div>''',
    '''    <div class="book-card">
      <div class="book-vol">Vol.4</div>
      <div class="book-title">《另一個人的記憶》</div>
      <div class="book-desc">前世記憶案例、身份滲透、意識轉移——如果記憶可以跨越個體，「我」是誰的問題就更大了。</div>
      <div class="book-actions">
        <a href="/that-feeling-1-vol4-trial.html" class="vol-btn trial">試閱</a>
      </div>
    </div>'''
)

# Vol.5
txt = txt.replace(
    '''    <div class="book-card">
      <div class="book-vol">Vol.5</div>
      <div class="book-title">《你和你之間的距離》</div>
      <div class="book-desc">催眠、解離狀態、意識層次——你以為你只有一個「你」，但你從來沒有驗證過這件事。</div>
      <div class="book-actions">
        <span class="vol-btn coming">試閱即將上線</span>
      </div>
    </div>''',
    '''    <div class="book-card">
      <div class="book-vol">Vol.5</div>
      <div class="book-title">《你和你之間的距離》</div>
      <div class="book-desc">催眠、解離狀態、意識層次——你以為你只有一個「你」，但你從來沒有驗證過這件事。</div>
      <div class="book-actions">
        <a href="/that-feeling-1-vol5-trial.html" class="vol-btn trial">試閱</a>
      </div>
    </div>'''
)

# Vol.6
txt = txt.replace(
    '''    <div class="book-card">
      <div class="book-vol">Vol.6</div>
      <div class="book-title">《意識的邊界在哪裡》</div>
      <div class="book-desc">動物意識、人工意識、意識的定義之爭——最後這個問題，科學家還沒有答案。</div>
      <div class="book-actions">
        <span class="vol-btn coming">試閱即將上線</span>
      </div>
    </div>''',
    '''    <div class="book-card">
      <div class="book-vol">Vol.6</div>
      <div class="book-title">《意識的邊界在哪裡》</div>
      <div class="book-desc">動物意識、人工意識、意識的定義之爭——最後這個問題，科學家還沒有答案。</div>
      <div class="book-actions">
        <a href="/that-feeling-1-vol6-trial.html" class="vol-btn trial">試閱</a>
      </div>
    </div>'''
)

if txt != orig:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK: that-feeling-1.html')
else:
    print('WARN: that-feeling-1.html no change')


# ── that-feeling-2.html ─────────────────────────────────────────────────────
path = os.path.join(PUBLIC, 'that-feeling-2.html')
with open(path, encoding='utf-8') as f:
    txt = f.read()

orig = txt

VOL_DATA_2 = [
    (2, '《那些廟在說什麼》', '民間信仰、乩童、問事的心理與社會學。廟不只是拜神的地方，它是這個社會的神經系統。'),
    (3, '《你家附近的鬼故事》', '都市傳說的在地變體與集體記憶。那些在特定地點流傳的故事，為什麼只在那裡存在。'),
    (4, '《死了要去哪》', '台灣喪葬文化、好兄弟信仰、魂魄觀。死亡在這個島嶼的處理方式，跟你想的不一樣。'),
    (5, '《台灣人為什麼這麼怕》', '禁忌、沖煞、犯太歲——恐懼的文化結構。把這些禁忌攤開來看，你會發現它們都有邏輯。'),
    (6, '《這塊土地上的聲音》', '台灣靈異事件的田野紀錄與歷史脈絡。有名字、有地點、有記錄的那些事，不是傳說。'),
]

for vol, title, desc in VOL_DATA_2:
    old = f'''    <!-- Vol.{vol} -->
    <div class="vol-card">
      <div class="vol-number">VOL. {vol}</div>
      <div class="vol-title">{title}</div>
      <div class="vol-desc">{desc}</div>
      <div class="vol-actions">
        <span class="vol-btn coming">即將上線</span>
      </div>
    </div>'''
    new = f'''    <!-- Vol.{vol} -->
    <div class="vol-card">
      <div class="vol-number">VOL. {vol}</div>
      <div class="vol-title">{title}</div>
      <div class="vol-desc">{desc}</div>
      <div class="vol-actions">
        <a href="/that-feeling-2-vol{vol}-trial.html" class="vol-btn">開放試閱</a>
      </div>
    </div>'''
    txt = txt.replace(old, new)

if txt != orig:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK: that-feeling-2.html')
else:
    print('WARN: that-feeling-2.html no change')


# ── that-feeling-3.html ─────────────────────────────────────────────────────
path = os.path.join(PUBLIC, 'that-feeling-3.html')
with open(path, encoding='utf-8') as f:
    txt = f.read()

orig = txt

# Vol.2-6: change class="vol-btn coming" → class="vol-btn trial" and remove " 即將上線"
for vol in [2, 3, 4, 5, 6]:
    txt = txt.replace(
        f'<a href="/that-feeling-3-vol{vol}-trial.html" class="vol-btn coming">試閱 即將上線</a>',
        f'<a href="/that-feeling-3-vol{vol}-trial.html" class="vol-btn trial">試閱</a>'
    )

if txt != orig:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK: that-feeling-3.html')
else:
    print('WARN: that-feeling-3.html no change')


# ── cognitive-psychology.html ────────────────────────────────────────────────
path = os.path.join(PUBLIC, 'cognitive-psychology.html')
with open(path, encoding='utf-8') as f:
    txt = f.read()

orig = txt

# Vol.2 coming soon → real link
txt = txt.replace(
    '<span class="theme-coming-soon">Vol.2 即將推出</span>',
    '<a href="/cognitive-psychology-vol2.html" class="theme-read-link">Vol.2 開始試閱 →</a>'
)

if txt != orig:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(txt)
    print('OK: cognitive-psychology.html')
else:
    print('WARN: cognitive-psychology.html no change')

print('\nAll done.')
