import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from '../components/UserProfile';

test('Assert user greeting is displayed', () => {
  render(<UserProfile />);

  const greeting = screen.getByRole('heading', { level: 1, className: 'user-profile__welcome' });
  expect(greeting).toBeInTheDocument();
  expect(greeting).toHaveTextContent('Hello');
});
