import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from './login';


const loginEntries = [
  { email: 'abc.defg.edu', password: 'password123' },
  { email: 'example@abc.com', password: 'password123' },
  { email: 'john_done@testing.com', password: 'pa$$password123' },
];


test('Validate Email Input', async () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  // const submitButton = screen.getByText(/submit/i);

  await userEvent.type(emailInput, loginEntries[0].email);
  await userEvent.type(passwordInput, loginEntries[0].password);

  screen.findByText(/invalid email address/i);
  expect(emailInput.value).toBe(loginEntries[0].email);
  expect(passwordInput.value).toBe(loginEntries[0].password);

}
)