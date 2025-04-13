import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockNews } from '../utils/mockNews';
import NewsCard from '../components/NewsCard';
import './HomePage.css';

const PAGE_SIZE = 2;

const HomePage = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('news')) || mockNews;
    setNews(stored);
  }, []);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedNews = filteredNews.slice(0, page * PAGE_SIZE);

  const loadMore = () => setPage(p => p + 1);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>🗞 Новости</h1>
        <Link to="/admin/new" className="add-link">+ Новая статья</Link>
      </div>

      <input
        type="text"
        placeholder="Поиск новостей..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="home-search"
      />

      {paginatedNews.map(news => (
        <NewsCard
          key={news.id}
          id={news.id}
          title={news.title}
          date={news.date}
          content={news.content}
        />
      ))}

      {paginatedNews.length < filteredNews.length && (
        <button onClick={loadMore} className="load-more">Загрузить ещё</button>
      )}
    </div>
  );
};

export default HomePage;
