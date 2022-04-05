import React from 'react';
import { useState, useEffect } from 'react';
import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleEmailChange(e) {
    setEmailValue(e.target.value);
  }
  function handlePasswordChange(e) {
    setPasswordValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit clicked!');
    loginUser({ email: emailValue, password: passwordValue });
    navigate('/');
  }

  return (
    <section>
      <h1>
        <span>LSDb</span> Login
      </h1>
      <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <div className='email field'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='text'
              className='input'
              id='email'
              value={emailValue}
              onChange={handleEmailChange}
            />
          </div>
          <div className='password field'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              className='input'
              id='password'
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
