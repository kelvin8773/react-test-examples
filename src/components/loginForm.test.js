import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  checkEmail,
  checkPassword,
} from '../utilities/check';
import LoginForm from './loginForm';

describe('Input unit test', () => {
  test('email is required', async () => {
    render(<LoginForm />);
    const emailInput = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i);
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/required/i)).not.toBeNull();
  });

  test('validate email address', async () => {
    render(<LoginForm />);
    const emailInput = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'abc.test.com' } });
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/invalid email address/i)).not.toBeNull();
  });

  test('password is required', async () => {
    render(<LoginForm />);
    const passwordInput = screen.queryByLabelText(/password/i)
      || screen.queryByPlaceholderText(/password/i);
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/required/i)).not.toBeNull();
  });

  test('check password complexity', async () => {
    render(<LoginForm />);
    const passwordInput = screen.queryByLabelText(/password/i)
      || screen.queryByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/Password is too simple/i)).not.toBeNull();
  });
});

const loginEntries = [
  { email: 'abc.test.com', password: '12345678' },
  { email: 'example@abc', password: 'pass$12D' },
  { email: 'jane@yahoo.com', password: 'passW34E' },
  { email: 'john_done@testing.com', password: 'Pa$$w0rd' },
];

describe('Input integrate Test', () => {
  test.each(loginEntries)('check combination for %s',
    async (loginEntry) => {
      render(<LoginForm />);
      const emailValid = checkEmail(loginEntry.email);
      const passwordValid = checkPassword(loginEntry.password);

      const emailInput = screen.queryByLabelText(/email/i) || screen.queryByPlaceholderText(/email/i);
      const passwordInput = screen.queryByLabelText(/password/i)
        || screen.queryByPlaceholderText(/password/i);

      fireEvent.change(emailInput, { target: { value: loginEntry.email } });
      fireEvent.blur(emailInput);

      if (!emailValid) {
        expect(await screen.findByText(/invalid email address/i)).not.toBeNull();
        console.log(loginEntry.email + ' is invalid email address.');
      }

      fireEvent.change(passwordInput, { target: { value: loginEntry.password } });
      fireEvent.blur(passwordInput);

      if (!passwordValid) {
        expect(await screen.findByText(/Password is too simple/i)).not.toBeNull();
        console.log(loginEntry.password + ' is too simple to a password.');
      };

      if (emailValid && passwordValid) {
        console.log(loginEntry.email + ' and ' + loginEntry.password + ' are good to go!')
      }

      await act(() => Promise.resolve()); // To avoid act wrapping warning
    }
  )
})