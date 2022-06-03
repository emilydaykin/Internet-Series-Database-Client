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

  // Get the login form's email input element:
  const emailInput = screen.getByLabelText('Email');

  // .toBeInTheDocument() comes from `jest-dom`
  expect(emailInput).toBeInTheDocument();

  // simulate user typing in email to form's email field:
  userEvent.type(emailInput, mockUser.email);

  // emailInput.value is from emailInput.pendingProps.value
  expect(emailInput.value).toEqual(mockUser.email);
});
