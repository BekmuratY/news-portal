import React from 'react';
import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ id, title, date, content }) => {
  const preview = content.length > 120 ? content.slice(0, 120) + '...' : content;

  return (
    <div className="news-card">
      <div className="news-header">
        <h3 className="news-title">{title}</h3>
        <span className="news-date">{date}</span>
      </div>
      <p className="news-preview">{preview}</p>
      <Link to={`/news/${id}`} className="news-link">Читать далее →</Link>
    </div>
  );
};

export default NewsCard;
