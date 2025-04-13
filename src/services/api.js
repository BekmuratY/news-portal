import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getNews = async () => {
  const res = await axios.get(`${API_URL}/news`);
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await axios.get(`${API_URL}/news/${id}`);
  return res.data;
};

export const getComments = async (newsId) => {
  const res = await axios.get(`${API_URL}/comments?newsId=${newsId}`);
  return res.data;
};

export const addComment = async (comment) => {
  const res = await axios.post(`${API_URL}/comments`, comment);
  return res.data;
};

export const updateComment = async (id, comment) => {
  const res = await axios.put(`${API_URL}/comments/${id}`, comment);
  return res.data;
};

export const deleteComment = async (id) => {
  return axios.delete(`${API_URL}/comments/${id}`);
};
