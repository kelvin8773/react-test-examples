import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  checkName,
  checkEmail,
  checkPassword,
} from '../utilities/check';
import SignupForm from './signupForm';

const entries = [
  { name: 'John', email: 'john_doe@yahoo', password: 'helloworld' },
  { name: 'Jo', email: 'jo.msn.com', password: 'pa$$W0rd' },
  { name: '', email: 'marry123@test.com', password: '123WX&abcd' },
  { name: 'kent'.repeat(10), email: 'kent@testing.com', password: 'w%oRD123yes' },
  { name: 'Robert', email: 'robert_bell@example.com', password: 'r&bsEc234E' },
]

describe('Input validate', () => {
  test.each(entries)('test with %s entry', async (entry) => {
    render(<SignupForm />);

    const nameValid = checkName(entry.name);
    const emailValid = checkEmail(entry.email);
    const passwordValid = checkPassword(entry.password);

    // grab all the input elements
    const nameInput = screen.queryByLabelText(/name/i)
      || screen.queryByPlaceholderText(/name/i);
    const emailInput = screen.getByLabelText(/email/i)
      || screen.queryByPlaceholderText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i)
      || screen.queryByPlaceholderText(/password/i);

    // input the value and validate them
    fireEvent.change(nameInput, { target: { value: entry.name } }); // input the value
    fireEvent.blur(nameInput); //trigger the validation

    if (entry.name.length === 0) {
      expect(await screen.findByText(/name is required/i)).not.toBeNull();
      console.log('name is required.');
    }
    else if (!nameValid) {
      // if the name is invalid, error msg will showup somewhere in the form
      expect(await screen.findByText(/invalid name/i)).not.toBeNull();
      console.log(entry.name + ' is invalid name.');
    };

    fireEvent.change(emailInput, { target: { value: entry.email } }); // input the value
    fireEvent.blur(emailInput); //trigger the validation

    if (entry.email.length === 0) {
      expect(await screen.findByText(/email is required/i)).not.toBeNull();
      console.log('email is required.');
    }
    else if (!emailValid) {
      // if the email is invalid, error msg will showup somewhere in the form
      expect(await screen.findByText(/invalid email address/i)).not.toBeNull();
      console.log(entry.email + ' is invalid email.');
    };

    fireEvent.change(passwordInput, { target: { value: entry.password } }); // input the value
    fireEvent.blur(passwordInput); //trigger the validation

    if (entry.password.length === 0) {
      expect(await screen.findByText(/password is required/i)).not.toBeNull();
      console.log('password is required.');
    }
    else if (!passwordValid) {
      // if the name is invalid, error msg will showup somewhere in the form
      expect(await screen.findByText(/password is too simple/i)).not.toBeNull();
      console.log(entry.password + ' is too simple to be a password.');
    }

    if (nameValid && emailValid && passwordValid) {
      console.log(
        entry.name + ', '
        + entry.email + ', '
        + entry.password +
        ' are valid combination.'
      )
    }

    await act(() => Promise.resolve()); // To avoid act wrapping warning

  })
})