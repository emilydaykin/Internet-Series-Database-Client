import axios from 'axios';

export const getAllSeries = async () => {
  return axios.get('/api/series');
};

export const getSeriesBySearchTerm = async (searchTerm) => {
  const options = {
    method: 'GET',
    url: `/api/series/${searchTerm}`
  };
  const { data } = await axios.request(options);
  return data;
};

export const filterSeriesByGenre = async (genreArray) => {
  const options = {
    method: 'POST',
    url: '/api/series/genre/search',
    data: { genres: genreArray }
  };
  const { data } = await axios.request(options);
  console.log('filtered series:', data);
  return data;
};

export const createSeries = async (content) => {
  const options = {
    method: 'POST',
    url: 'api/series',
    data: content,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const createComment = async (seriesId, comment) => {
  const options = {
    method: 'POST',
    url: `/api/series/${seriesId}/comments`,
    data: comment,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};

export const deleteComment = async (seriesId, commentId) => {
  const options = {
    method: 'DELETE',
    url: `/api/series/${seriesId}/comments/${commentId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };
  const { data } = await axios.request(options);
  return data;
};
