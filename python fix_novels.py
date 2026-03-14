import json

file = r"C:\Users\user\Desktop\MyProjects01\surprise-corner-src\src\data\novels.json"

with open(file, "r", encoding="utf-8-sig") as f:
    data = json.load(f)

for item in data:
    if item["id"] == "soul-journey":
        item["category"] = "preview"
        item["scheduleNote"] = "看看喜不喜歡"
        item["previewChapters"] = 6

with open(file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("完成！")