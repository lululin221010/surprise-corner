"""
Fix readability issues in all that-feeling HTML files.
Problems: dark text colors, small secondary text, no mobile font adjustments.
"""
import os, re

PUBLIC = r'C:\Users\user\Desktop\MyProjects01\surprise-corner-src\public'

# All that-feeling HTML files
files = [
    f for f in os.listdir(PUBLIC)
    if f.startswith('that-feeling') and f.endswith('.html')
    and 'en' not in f  # skip English version
]

# Color replacements (old → new, brighter/higher contrast)
COLOR_FIXES = [
    # Main text: slightly brighter
    ('--text: #c0c0d8', '--text: #dcdcf0'),
    # Muted text: much brighter (was too dark)
    ('--text-muted: #7070a0', '--text-muted: #a8a8cc'),
    # Label: much brighter (was nearly invisible)
    ('--label: #5a5a8a', '--label: #9090b8'),
    # Blockquote inline color
    ('color: #a0a0c0', 'color: #c8c8e4'),
    # h3 color in content
    ('color: #c8c8e0', 'color: #dcdcf0'),
]

# Mobile responsive CSS to inject before </style>
MOBILE_CSS = """
  /* 手機可讀性優化 */
  @media (max-width: 600px) {
    body { font-size: 16px; line-height: 1.9; }
    .container { padding: 0 20px 60px; }
    .book-title { font-size: 1.6rem; letter-spacing: 2px; }
    .content h2 { font-size: 1.15rem; letter-spacing: 1px; margin: 36px 0 18px; }
    .content p { margin-bottom: 20px; }
    .series-grid { grid-template-columns: 1fr; }
    .vol-grid { grid-template-columns: 1fr; }
  }
"""

updated = 0
for fname in sorted(files):
    path = os.path.join(PUBLIC, fname)
    with open(path, encoding='utf-8') as f:
        content = f.read()

    original = content

    # Apply color fixes
    for old, new in COLOR_FIXES:
        content = content.replace(old, new)

    # Inject mobile CSS if not already present
    if '@media (max-width: 600px)' not in content:
        content = content.replace('</style>', MOBILE_CSS + '</style>', 1)

    if content != original:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'  OK: {fname}')
        updated += 1
    else:
        print(f'  SKIP (no change): {fname}')

print(f'\nDone: {updated}/{len(files)} files updated.')
