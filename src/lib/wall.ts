// 📁 路徑：src/lib/wall.ts

// 取得或建立 creatorId
export function getCreatorId(): string {
  let id = localStorage.getItem("creatorId");
  if (!id) {
    id = "cr_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("creatorId", id);
  }
  return id;
}

/**
 * 將 AI 生成內容送到作品牆
 * 回傳作品 ID，可用來跳轉到作品頁
 *
 * 使用範例：
 *   const id = await submitToWall(aiResult);
 *   if (id) window.location.href = `/wall/${id}`;
 */
export async function submitToWall(text: string): Promise<string | null> {
  try {
    const res = await fetch("/api/wall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        creatorId: getCreatorId(),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("送出失敗:", err.error);
      return null;
    }

    const data = await res.json();
    return data.id;
  } catch (e) {
    console.error("網路錯誤:", e);
    return null;
  }
}