import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ShowSeries from './ShowSeries';
import Login from './auth/Login';
import Register from './Register';
import AddSeries from './AddSeries';
import UserProfile from './UserProfile';
import Footer from './Footer';
import { getLoggedInUser, isAdmin } from '../lib/auth';
import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'https://internet-series-db.cyclic.app';
}

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/series/:id' element={<ShowSeries />} />
      {isAdmin() && <Route path='/addSeries' element={<AddSeries />} />}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {getLoggedInUser() && <Route path='/userprofile' element={<UserProfile />} />}
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
