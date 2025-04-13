import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockNews } from '../utils/mockNews';
import { mockComments as initialComments } from '../utils/mockComments';
import CommentItem from '../components/CommentItem';
import CommentForm from '../components/CommentForm';
import './NewsPage.css';

const NewsPage = () => {
  const { id } = useParams();
  const newsId = parseInt(id, 10);

  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [editComment, setEditComment] = useState(null);

  const isAdmin = true;

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('news')) || mockNews;
    const foundNews = storedNews.find(n => n.id === newsId);
    setNews(foundNews || null);

    const storedComments = JSON.parse(localStorage.getItem(`comments-${newsId}`))
      || initialComments.filter(c => c.newsId === newsId);
    setComments(storedComments);
  }, [newsId]);

  const saveComments = (updatedComments) => {
    setComments(updatedComments);
    localStorage.setItem(`comments-${newsId}`, JSON.stringify(updatedComments));
  };

  const handleSubmit = (data) => {
    const parentId = data.parentId ?? null;

    if (editComment) {
      const updated = comments.map(c =>
        c.id === editComment.id ? { ...c, ...data, date: new Date().toLocaleString() } : c
      );
      saveComments(updated);
      setEditComment(null);
    } else {
      const newComment = {
        ...data,
        id: Date.now(),
        newsId,
        parentId,
        date: new Date().toLocaleString(),
      };
      saveComments([...comments, newComment]);
    }

    setReplyTo(null);
  };

  const handleDelete = (id) => {
    const updated = comments.filter(c => c.id !== id && c.parentId !== id);
    saveComments(updated);
  };

  const renderComments = (parentId = null, level = 0) =>
    comments
      .filter(c => c.parentId === parentId)
      .map(c => (
        <CommentItem
          key={c.id}
          comment={c}
          level={level}
          isReplying={replyTo === c.id}
          isEditing={editComment?.id === c.id}
          onReply={id => { setReplyTo(id); setEditComment(null); }}
          onEdit={c => { setEditComment(c); setReplyTo(null); }}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
        />
      ));

  if (!news) return <div className="news-container">🛑 Новость не найдена</div>;

  return (
    <div className="news-container">
      <h2 className="news-title">{news.title}</h2>
      <p className="news-content">{news.content}</p>
      <hr />
      <h3>💬 Комментарии</h3>
      {renderComments()}
      <h4 style={{ marginTop: 20 }}>Добавить комментарий</h4>
      <CommentForm
        key={editComment ? `edit-${editComment.id}` : 'new'}
        onSubmit={handleSubmit}
        initialData={editComment}
      />
    </div>
  );
};

export default NewsPage;
