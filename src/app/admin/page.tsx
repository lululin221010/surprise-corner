'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [formData, setFormData] = useState({
    date: '',
    title: '',
    content: '',
    category: 'quote',
    tags: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 匯入種子資料
  const handleSeedData = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/surprises/seed', {
        method: 'POST',
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ 匯入失敗: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ 網路錯誤');
    } finally {
      setLoading(false);
    }
  };

  // 新增單筆資料
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      const res = await fetch('/api/surprise/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: formData.date,
          type: formData.category,
          message: `${formData.title}\n\n${formData.content}`,
          title: formData.title,
          content: formData.content,
          category: formData.category,
          tags,
        }),
      });

      const data = await res.json();
      
      if (data.success) {
        setMessage('✅ 新增成功！');
        setFormData({
          date: '',
          title: '',
          content: '',
          category: 'quote',
          tags: '',
        });
      } else {
        setMessage(`❌ 新增失敗: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ 網路錯誤');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          📝 Surprise Corner 管理後台
        </h1>

        {/* 匯入種子資料 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">批量匯入資料</h2>
          <p className="text-gray-600 mb-4">
            匯入預設的 30 天驚喜內容（2/6 - 3/8）
          </p>
          <button
            onClick={handleSeedData}
            disabled={loading}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? '匯入中...' : '🚀 匯入種子資料'}
          </button>
        </div>

        {/* 新增單筆資料 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">新增單筆驚喜</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日期 *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 標題 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                標題 * (建議加上 emoji)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="🌟 今日金句"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 內容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                內容 *
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="今天的驚喜內容..."
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* 分類 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                分類
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="quote">金句</option>
                <option value="challenge">挑戰</option>
                <option value="fact">冷知識</option>
                <option value="lifehack">生活提案</option>
                <option value="music">音樂</option>
                <option value="travel">旅行</option>
                <option value="book">書籍</option>
                <option value="recipe">食譜</option>
                <option value="game">遊戲</option>
                <option value="mindfulness">正念</option>
                <option value="movie">電影</option>
                <option value="other">其他</option>
              </select>
            </div>

            {/* 標籤 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                標籤 (用逗號分隔)