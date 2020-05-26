import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  checkName,
  checkEmail,
  checkPassword,
} from '../utilities/check';
import SignupForm from './signupForm';

const entries = [
  { name: 'John', email: 'john_doe@yahoo', password: 'password' },
  { name: 'Jo', email: 'jo.msn.com', password: 'pa$$W0rd' },
  { name: 'Marry', email: 'marry123@test.com', password: '123456abcd' },
  { name: 'kent'.repeat(10), email: 'kent@testing.com', password: 'w%oRD123yes' },
  { name: 'Robert', email: 'robert_bell@example.com', password: 'r&bsEc234E' },
]

describe('Input validate', () => {
  test.each(entries)('test with %s entry', (entry) => {
    render(<SignupForm />);

    // grab all the input elements
    const nameInput = screen.queryByLabelText(/name/i)
      || screen.queryByPlaceholderText(/name/i);
    const emailInput = screen.getByLabelText(/email/i)
      || screen.queryByPlaceholderText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i)
      || screen.queryByPlaceholderText(/password/i);


  })
})