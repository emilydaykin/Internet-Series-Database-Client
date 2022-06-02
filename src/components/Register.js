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
    console.log('e.target.id', e.target.id);
    console.log('e.target.value', e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      console.log('submit clicked!');
      await registerUser({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation
      });
      navigate('/login');
    } catch (err) {
      // console.log('register err response message:', err.response.data.message);
      // console.log('register err message:', err.message);
      setErrorMessage(err.response.data.message);
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
          <p className='form__error-message'>{errorMessage}</p>
          <button className='button'>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
