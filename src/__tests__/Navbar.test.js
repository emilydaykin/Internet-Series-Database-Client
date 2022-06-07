import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('Assert correct items are shown in Navbar', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Assert Navbar items are displayed to user:
  const homeButton = screen.queryByText(/home/i);
  expect(homeButton).toBeInTheDocument();
  const logInButton = screen.queryByText(/log in/i);
  expect(logInButton).toBeInTheDocument();
  const registerButton = screen.queryByText(/register/i);
  expect(registerButton).toBeInTheDocument();

  const userProfileButton = screen.queryByText(/my profile/i);
  expect(userProfileButton).not.toBeInTheDocument();
  const addSeriesButton = screen.queryByText(/add series/i);
  expect(addSeriesButton).not.toBeInTheDocument();

  // Assert Navbar items are links that have a to={''} redirect
});
