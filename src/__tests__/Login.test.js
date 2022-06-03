import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';

test('Accept user input and display it correctly', () => {
  // Login (since it contains useNavigate) must be wrapped in BrowserRouter
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email');

  // .toBeInTheDocument() comes from `jest-dom`
  expect(emailInput).toBeInTheDocument();
});
