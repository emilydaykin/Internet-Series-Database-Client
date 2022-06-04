import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';

const mockUser = {
  email: 'mock@user.com',
  password: 'mockPassword1!'
};

// afterEach(cleanup);

test('Assert that no error message is displayed upon initial render', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  // Get text of all possible error messages:
  const errorMessageFormNotFilled = screen.queryByText('Please enter your credentials.');
  const errorMessageEmailNotFilled = screen.queryByText('Please enter your email.');
  const errorMessagePasswordNotFilled = screen.queryByText('Please enter your password.');
  const errorMessageIncorrectCreds = screen.queryByText('Incorrect credentials.');

  const possibleErrorMessages = [
    errorMessageFormNotFilled,
    errorMessageEmailNotFilled,
    errorMessagePasswordNotFilled,
    errorMessageIncorrectCreds
  ];

  possibleErrorMessages.forEach((errMsg) => expect(errMsg).not.toBeInTheDocument());
});

test('Assert user inputs are accepted and displayed correctly', () => {
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

test('Assert input values are correctly sent as a post request to API upon submit', async () => {
  // Initialise the value of axios.post by creating a mock
  axios.post = jest.fn();
  axios.post();
  // axios.post.mockResolvedValueOnce();

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { className: /button/i });

  // User flow of logging in (enter creds then submit):
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  // console.log('============ axios.post', axios.post);
  // await waitFor(() => console.log('============ axios.post.mock', axios.post.mock));

  // expect(axios.post).toBeCalledWith('http://localhost:8001/api/login', mockUser);
});

test('Assert error message displayed when incorrect credentials are provided', async () => {
  // Initialise the value of axios.post by creating a mock
  axios.post = jest.fn();
  axios.post();
  // axios.post.mockRejectedValueOnce();

  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByRole('button', { className: /button/i });

  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Incorrect credentials.');
});
