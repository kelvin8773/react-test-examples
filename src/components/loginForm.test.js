import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './loginForm';

const loginEntries = [
  { email: 'abc.test.com', password: '123' },
  { email: 'example@abc.com', password: 'password123' },
  { email: 'john_done@testing.com', password: 'pa$$password123' },
];

describe('Input unit test', () => {
  test('email is required', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/required/i)).not.toBeNull();
  });

  test('validate email address', async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'abc.test.com' } });
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/invalid email address/i)).not.toBeNull();
  });

  test('password is required', async () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/required/i)).not.toBeNull();
  });

  test('check password complexity', async () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } });
    fireEvent.blur(passwordInput);
    expect(await screen.findByText(/Password is too simple/i)).not.toBeNull();
  });
})