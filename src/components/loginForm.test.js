import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import LoginForm from './loginForm';

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
});

const loginEntries = [
  { email: 'abc.test.com', password: '12345678' },
  { email: 'example@abc', password: 'pass$12D' },
  { email: 'jane@yahoo.com', password: 'passW34E' },
  { email: 'john_done@testing.com', password: 'Pa$$w0rd' },
];

const checkEmail = (email) => {
  const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegx.test(email);
};

const checkPassword = (password) => {
  const passwordRegx = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  // reference link 
  // https://www.itworld.com/article/2833081/how-to-validate-password-strength-using-a-regular-expression.html
  // The password length must be greater than or equal to 8
  // The password must contain one or more uppercase characters
  // The password must contain one or more lowercase characters
  // The password must contain one or more numeric values
  // The password must contain one or more special characters
  return passwordRegx.test(password);
};

describe('Input integrate Test', () => {
  test.each(loginEntries)('check combination for %s',
    async (loginEntry) => {
      render(<LoginForm />);
      const emailValid = checkEmail(loginEntry.email);
      const passwordValid = checkPassword(loginEntry.password);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      fireEvent.change(emailInput, { target: { value: loginEntry.email } });
      fireEvent.blur(emailInput);

      if (!emailValid) {
        expect(await screen.findByText(/invalid email address/i)).not.toBeNull();
      };

      fireEvent.change(passwordInput, { target: { value: loginEntry.password } });
      fireEvent.blur(passwordInput);

      if (!passwordValid) {
        expect(await screen.findByText(/Password is too simple/i)).not.toBeNull();
      };

      await act(() => Promise.resolve()); // To avoid act wrapping warning
    }
  )
})