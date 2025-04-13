import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNews } from '../utils/mockNews';

const AdminNewPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Заполни все поля');

    const newArticle = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem('news')) || mockNews;
    localStorage.setItem('news', JSON.stringify([newArticle, ...existing]));

    navigate('/');
  };

  return (
    <div style={{ maxWidth: 700, margin: '40px auto' }}>
      <h2>📝 Новая статья</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <input
          placeholder="Заголовок"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ padding: 10, fontSize: 16 }}
        />
        <textarea
          placeholder="Текст статьи"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ padding: 10, fontSize: 16, minHeight: 200 }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '12px',
            fontSize: 16,
            borderRadius: 5,
            cursor: 'pointer'
          }}
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
};

export default AdminNewPage;
