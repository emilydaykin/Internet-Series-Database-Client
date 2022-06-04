import { render, screen, cleanup, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

const mockUser = {
  username: 'mcMock',
  email: 'mock@user.com',
  password: 'mockPassword1!',
  passwordConfirmation: 'mockPassword1!'
};

afterEach(cleanup);

test('Assert no error messages are displayed upon initial render', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  // Get text of all possible error messages:
  const errorMessageFormNotFilled = screen.queryByText('Please fill in the form.');
  const errorMessageNameNotFilled = screen.queryByText('Please fill in your name.');
  const errorMessageEmailNotFilled = screen.queryByText('Please fill in your email.');
  const errorMessagePasswordNotFilled = screen.queryByText('Please fill in your password.');
  const errorMessagePasswordNotConfirmed = screen.queryByText('Please confirm your password.');

  const possibleErrorMessages = [
    errorMessageFormNotFilled,
    errorMessageNameNotFilled,
    errorMessageEmailNotFilled,
    errorMessagePasswordNotFilled,
    errorMessagePasswordNotConfirmed
  ];

  // `toBeInTheDocument()` from Jest
  possibleErrorMessages.forEach((errMsg) => expect(errMsg).not.toBeInTheDocument());
});

test('Assert user inputs are accepted and displayed correctly', () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
  const submitButton = screen.getByRole('button', { className: /button/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfirmationInput).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);

  expect(nameInput.value).toEqual(mockUser.username);
  expect(emailInput.value).toEqual(mockUser.email);
  expect(passwordInput.value).toEqual(mockUser.password);
  expect(passwordConfirmationInput.value).toEqual(mockUser.passwordConfirmation);
});

test('Assert input values are correctly sent as a post request to API upon submit', async () => {
  axios.post = jest.fn();
  axios.post();

  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );

  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
  const submitButton = screen.getByRole('button', { className: /button/i });

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));
});
