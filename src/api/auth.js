import axios from 'axios';

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: '/api/login',
    data: credentials // `data`! not body!!
  };

  const { data } = await axios.request(options);

  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    // if user has no token (so unauthorised user?)
    window.sessionStorage.remove('token');
  }
  console.log('data:', data);
  return data.message;
};
