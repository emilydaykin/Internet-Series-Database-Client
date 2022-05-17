import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import ShowSeries from './ShowSeries';
import Login from './auth/Login';
import Register from './Register';
import AddSeries from './AddSeries';
import UserProfile from './UserProfile';
import { getLoggedInUser, isAdmin } from '../lib/auth';

import '../styles/style.scss';

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
  </BrowserRouter>
);

export default App;
