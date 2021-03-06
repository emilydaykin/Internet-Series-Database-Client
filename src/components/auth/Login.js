import React from 'react';
import { useState } from 'react';
import { loginUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmailChange(e) {
    setEmailValue(e.target.value);
    setErrorMessage('');
  }
  function handlePasswordChange(e) {
    setPasswordValue(e.target.value);
    setErrorMessage('');
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await loginUser({ email: emailValue, password: passwordValue });
      navigate('/');
      // refreshing is probs bad practice, but so that user profile loads right away
      window.location.reload(true);
    } catch (err) {
      if (emailValue === '' && passwordValue === '') {
        setErrorMessage('Please enter your credentials.');
      } else if (emailValue === '') {
        setErrorMessage('Please enter your email.');
      } else if (passwordValue === '') {
        setErrorMessage('Please enter your password.');
      } else {
        setErrorMessage('Incorrect credentials.');
      }
    }
  }

  return (
    <section className='auth'>
      <h1>
        <span>ISDb</span> Log In
      </h1>
      <p className='auth__subtext'>
        Log in to add series to your 'favourites' list, and get recommendations of other series you
        may like!
      </p>
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
          {errorMessage && (
            <p className='form__error-message' role='error-message'>
              {errorMessage}
            </p>
          )}
          <button className='button'>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
