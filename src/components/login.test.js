import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LoginForm from './loginForm';
import user from '@testing-library/user-event';

const loginEntries = [
  { email: 'abc.test.com', password: '123' },
  { email: 'example@abc.com', password: 'password123' },
  { email: 'john_done@testing.com', password: 'pa$$password123' },
];

test('Validate Email Input', async () => {
  render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  await user.type(emailInput, loginEntries[0].email);
  await user.type(passwordInput, loginEntries[0].password);

  expect(emailInput.value).toBe(loginEntries[0].email);
  expect(passwordInput.value).toBe(loginEntries[0].password);

  user.click(submitButton);

  expect(await screen.getByText(/invalid email address/i)).toBeInTheDocument();

})