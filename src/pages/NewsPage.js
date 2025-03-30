import React from 'react';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { id } = useParams();
  return <div>📄 Детали новости ID: {id}</div>;
};

export default NewsPage;