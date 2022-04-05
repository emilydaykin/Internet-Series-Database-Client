import React from 'react';
import { useState, useEffect } from 'react';
// import { loginUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  function handleChange(e) {
    console.log('e.target.id', e.target.name);
    console.log('e.target.value', e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submit clicked!');
    // loginUser({ email: emailValue, password: passwordValue });
    // navigate('/');
  }

  return (
    <section>
      <h1>
        <span>LSDb</span> Register
      </h1>
      <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <div className='name field'>
            <label htmlFor='name' className='label'>
              Name
            </label>
            <input
              type='text'
              className='input'
              id='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='email field'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='text'
              className='input'
              id='email'
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='passwordConfirmation field'>
            <label htmlFor='passwordConfirmation' className='label'>
              Password Confirmation
            </label>
            <input
              type='password'
              className='input'
              id='passwordConfirmation'
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
