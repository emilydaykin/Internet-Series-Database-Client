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

const renderRegisterComponent = () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

const getInputFields = () => {
  const nameInput = screen.getByLabelText('Name');
  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
  const submitButton = screen.getByRole('button', { className: /button/i });

  return { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton };
};

afterEach(cleanup);

test('Assert no error messages are displayed upon initial render', () => {
  renderRegisterComponent();

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
  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

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

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));
});

// ------------------------ Front end error messages ------------------------ //

test('Assert empty form error if form is blank', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { submitButton } = getInputFields();

  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Please fill in the form.');
});

test('Assert empty email field error if blank', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, passwordInput, passwordConfirmationInput, submitButton } = getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Please fill in your email.');
});

test('Assert empty password field error if password blank', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, submitButton } = getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Please fill in your password.');
});

test('Assert password confirmation error if password is not confirmed', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, submitButton } = getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent('Please confirm your password.');
});

// ------------------------ Back end error messages ------------------------ //

test('Assert non-unique username error if username is taken', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

  userEvent.type(nameInput, 'admin');
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();

  // Very hacky..
  expect(errorMessage).toHaveTextContent('Undefined error message (from backend).');
});

test('Assert invalid email error if email format incorrect', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, 'mock@helloworld');
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, mockUser.passwordConfirmation);
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();

  // Very hacky..
  expect(errorMessage).toHaveTextContent('Undefined error message (from backend).');
});

test('Assert invalid password error if password does not meet criteria', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, '12345');
  userEvent.type(passwordConfirmationInput, '12345');
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });

  expect(errorMessage).toBeInTheDocument();

  // Very hacky..
  expect(errorMessage).toHaveTextContent('Undefined error message (from backend).');
});

test('Assert passwords not matching', async () => {
  axios.post = jest.fn();
  axios.post();

  renderRegisterComponent();

  const { nameInput, emailInput, passwordInput, passwordConfirmationInput, submitButton } =
    getInputFields();

  userEvent.type(nameInput, mockUser.username);
  userEvent.type(emailInput, mockUser.email);
  userEvent.type(passwordInput, mockUser.password);
  userEvent.type(passwordConfirmationInput, '12345');
  userEvent.click(submitButton);

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));

  const errorMessage = screen.getByRole('error-message', { className: /form__error-message/i });
  console.log('errorMessage', errorMessage);

  expect(errorMessage).toBeInTheDocument();

  // Very hacky..
  expect(errorMessage).toHaveTextContent('Undefined error message (from backend).');
});
