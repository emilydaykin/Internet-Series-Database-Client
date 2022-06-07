import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '../components/UserProfile';

// Only the elastic carousel depends on the (mock) data, so that's
// tested there, and no need for an `act(...)` wrapper here since
// we're testing the initial state only.

test('Assert user greeting is displayed', () => {
  render(<UserProfile />);

  const greeting = screen.getByRole('heading', { level: 1, className: 'user-profile__welcome' });
  expect(greeting).toBeInTheDocument();
  expect(greeting).toHaveTextContent('Hello');
});

test('Assert favourited series div to be displayed', async () => {
  render(<UserProfile />);

  const favouriteSeriesHeading = screen.queryByText(/favourite series/i);
  expect(favouriteSeriesHeading).toBeInTheDocument();
});

test('Assert recommended series div to be displayed', async () => {
  render(<UserProfile />);

  const recommendationsHeading = screen.queryByText(/other series you may like/i);
  expect(recommendationsHeading).toBeInTheDocument();
});
