import React from 'react';
import { useState, useEffect } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    setErrorMessage('');
    // console.log('e.target.id', e.target.id);
    // console.log('e.target.value', e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      console.log('register submit clicked!');
      await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation
      });
      navigate('/login');
    } catch (err) {
      // console.log('formData', formData);
      if (
        formData.name === '' &&
        formData.email === '' &&
        formData.password === '' &&
        formData.passwordConfirmation === ''
      ) {
        setErrorMessage('Please fill in the form.');
      } else if (formData.name === '') {
        setErrorMessage('Please fill in your name.');
      } else if (formData.email === '') {
        setErrorMessage('Please fill in your email.');
      } else if (formData.password === '') {
        setErrorMessage('Please fill in your password.');
      } else if (formData.passwordConfirmation === '') {
        setErrorMessage('Please confirm your password.');
      } else {
        // setErrorMessage(err.response.data.message);
        // console.log('err', err);
        console.log('err.response', err.response);
        // setErrorMessage(`Error: ${err.response}`);
      }
    }
  }

  return (
    <section>
      <h1>
        <span>LSDb</span> Register
      </h1>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className='form'>
          <div className='form__field form__field--name'>
            <label htmlFor='name' className='form__label'>
              Name
            </label>
            <input
              type='text'
              className='form__input'
              id='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='form__field form__field--email'>
            <label htmlFor='email' className='form__label'>
              Email
            </label>
            <input
              type='email'
              className='form__input'
              id='email'
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='form__field form__field--password-confirmation'>
            <label htmlFor='passwordConfirmation' className='form__label'>
              Password Confirmation
            </label>
            <input
              type='password'
              className='form__input'
              id='passwordConfirmation'
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          {errorMessage && <p className='form__error-message'>{errorMessage}</p>}
          <button className='button'>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
