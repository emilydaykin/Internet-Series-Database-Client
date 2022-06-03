import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import userEvent from '@testing-library/user-event';

const mockUser = {
  email: 'mock@user.com',
  password: 'mockPassword1!'
};

test('Accept user input and display it correctly', () => {
  // Login (since it contains useNavigate) must be wrapped in BrowserRouter
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Get the login form's input elements:
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');

  // Get the form's button element with a (case-insensitive) classname of 'button'
  const submitButton = screen.getByRole('button', { className: /button/i });

  // .toBeInTheDocument() comes from `jest-dom`
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  // simulate user typing in email & pw to form's input fields:
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);

  // emailInput.value is from emailInput.pendingProps.value
  expect(emailInput.value).toEqual(mockUser.email);
  expect(passwordInput.value).toEqual(mockUser.password);
});
