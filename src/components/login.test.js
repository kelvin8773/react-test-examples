import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './loginForm';
import userEvent from '@testing-library/user-event';


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

  // fireEvent.change(emailInput, { target: { value: loginEntries[0].email } });
  // fireEvent.change(passwordInput, { target: { value: loginEntries[0].password } });

  await userEvent.type(emailInput, loginEntries[0].email);
  await userEvent.type(passwordInput, loginEntries[0].password);

  expect(emailInput.value).toBe(loginEntries[0].email);
  expect(passwordInput.value).toBe(loginEntries[0].password);

  userEvent.click(submitButton);
  const errorEmail = screen.getByTestId(/error-email/i);

  expect(errorEmail.textContent).toBe('invalid email address');

})