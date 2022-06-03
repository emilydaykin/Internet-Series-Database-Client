import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Login from '../components/auth/Login';

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

test('Upon submit, post input values correctly to API', async () => {
  // Initialise the value of axios.post by creating a mock
  axios.post = jest.fn();
  // axios.post.mockResolvedValueOnce();
  axios.post();
  // const postRequest = axios.post();
  // console.log('axios.post.mock 1-----------------', axios.post.mock);
  // console.log('axios.post.mock.instances', axios.post.mock.instances);

  // const axiosMock = axios;
  // axiosMock.create = jest.fn();
  // axiosMock.create.mockReturnValue(axiosMock);
  // axiosMock.post.mockResolvedValue(mockUser);

  // axios.post.mockResolvedValueOnce();
  // axios.post.mockResolvedValue(mockUser);

  // expect(axios.post).toHaveBeenCalledWith();

  // const mockAxiosPost = jest.fn();

  // mockAxiosPost();

  // expect(mockAxiosPost).toHaveBeenCalledTimes(1);
  // expect(mockAxiosPost).toHaveBeenCalledWith();

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

  // axios.post.mockResolvedValueOnce();

  await waitFor(() => expect(axios.post).toHaveBeenCalled());
  // await waitFor(() => expect(mockAxiosPost).toHaveBeenCalled());
  await waitFor(() => expect(axios.post).toBeCalledTimes(1));
  // await waitFor(() => expect(mockAxiosPost).toBeCalledTimes(1));
  // console.log('axios.post', axios.post());
  // console.log('postRequest', postRequest);
  // expect(mockAxiosPost).toBeCalledWith('http://localhost:8002/login', mockUser);

  // console.log('axios.post.mock 2 ------------', axios.post.mock);
  // expect(axios.post).toBeCalledWith('http://localhost:8001/api/login', mockUser);

  // expect(axios.request).toHaveBeenCalledWith({
  //   method: 'POST',
  //   url: 'http://localhost:8001/api/login',
  //   data: mockUser
  // });

  // await waitFor(() =>
  //   expect(axios.post).toBeCalledWith('http://localhost:8001/api/login', mockUser)
  // );
});
