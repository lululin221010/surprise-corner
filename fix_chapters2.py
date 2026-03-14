import json, subprocess
from datetime import date, timedelta

# 從 Git 直接讀取正確版本
result = subprocess.run(
    ["git", "show", "5809f90:src/data/chapters.json"],
    capture_output=True, encoding="utf-8",
    cwd=r"C:\Users\user\Desktop\MyProjects01\surprise-corner-src"
)
data = json.loads(result.stdout)

signal_dates = []
d = date(2026, 3, 17)
for _ in range(30):
    signal_dates.append(d.strftime("%Y-%m-%d"))
    d += timedelta(days=2)

soul_dates = []
d = date(2026, 3, 16)
for _ in range(30):
    soul_dates.append(d.strftime("%Y-%m-%d"))
    d += timedelta(days=2)

soul_ids = [
    "soul-s-01-01","soul-s-01-02","soul-s-01-03",
    "soul-s-02-01","soul-s-02-02","soul-s-02-03",
    "soul-s-03-01","soul-s-03-02","soul-s-03-03",
    "soul-s-04-01","soul-s-04-02","soul-s-04-03",
    "soul-s-05-01","soul-s-05-02","soul-s-05-03",
    "soul-s-06-01","soul-s-06-02","soul-s-06-03",
    "soul-s-07-01","soul-s-07-02","soul-s-07-03",
    "soul-s-08-01","soul-s-08-02","soul-s-08-03",
    "soul-s-09-01","soul-s-09-02","soul-s-09-03",
    "soul-s-10-01","soul-s-10-02","soul-s-10-03",
]

for item in data:
    if item["novelId"] == "the-last-signal":
        n = item["chapterNumber"]
        item["publishedAt"] = signal_dates[n-1]
        item["isFree"] = n <= 6
    if item["novelId"] == "soul-journey" and item["id"] in soul_ids:
        idx = soul_ids.index(item["id"])
        item["publishedAt"] = soul_dates[idx]
        item["isFree"] = idx < 6

file = r"C:\Users\user\Desktop\MyProjects01\surprise-corner-src\src\data\chapters.json"
with open(file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("完成！")