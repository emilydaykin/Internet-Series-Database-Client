import axios from 'axios';

export const loginUser = async (credentials) => {
  const response = axios.post('/api/login', credentials);

  const { data } = await response;

  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    // if user has no token (so unauthorised user?)
    window.sessionStorage.remove('token');
  }

  return response;
};

export const registerUser = async (userData) => {
  const response = axios.post('/api/users', userData);

  const { data } = await response;

  return data;
};

export const addSeriesToUserFavourites = async (seriesId) => {
  const options = {
    method: 'PUT',
    url: '/api/users',
    data: { seriesId: seriesId },
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };

  const { data } = await axios.request(options);

  return data;
};

export const getUserFavourites = async (userId) => {
  const options = {
    method: 'GET',
    url: `/api/users/${userId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`
    }
  };

  const { data } = await axios.request(options);
  return data;
};
