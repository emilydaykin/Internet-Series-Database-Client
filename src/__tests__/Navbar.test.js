import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import { BrowserRouter } from 'react-router-dom';

test('Assert correct items are shown in Navbar when user not logged in', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  const baseUrl = 'http://localhost';

  const linkItems = screen.getAllByRole('link');
  expect(linkItems.length).toEqual(3);

  expect(linkItems[0]).toHaveTextContent(/home/i); // Home button
  expect(linkItems[0].href).toBe(`${baseUrl}/`); // Home button link

  const logInButton = screen.queryByText(/log in/i);
  expect(logInButton).toBeInTheDocument();
  expect(logInButton.href).toBe(`${baseUrl}/login`);
  const registerButton = screen.queryByText(/register/i);
  expect(registerButton).toBeInTheDocument();
  expect(registerButton.href).toBe(`${baseUrl}/register`);

  const userProfileButton = screen.queryByText(/my profile/i);
  expect(userProfileButton).not.toBeInTheDocument();
  const addSeriesButton = screen.queryByText(/add series/i);
  expect(addSeriesButton).not.toBeInTheDocument();
});
