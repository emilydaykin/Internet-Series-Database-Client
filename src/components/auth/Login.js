import React from 'react';
import { useState } from 'react';
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
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form__field form__field--email'>
            <label htmlFor='email' className='form__label'>
              Email
            </label>
            <input
              type='text'
              className='form__input'
              id='email'
              value={emailValue}
              onChange={handleEmailChange}
            />
          </div>
          <div className='form__field form__field--password'>
            <label htmlFor='password' className='form__label'>
              Password
            </label>
            <input
              type='password'
              className='form__input'
              id='password'
              value={passwordValue}
              onChange={handlePasswordChange}
            />
          </div>
          <button className='button'>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
