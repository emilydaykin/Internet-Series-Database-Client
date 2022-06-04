import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/Register';
import { BrowserRouter } from 'react-router-dom';

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
