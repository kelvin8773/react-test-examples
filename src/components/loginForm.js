import React from 'react';
import { Formik } from 'formik';
import {
  checkEmail,
  checkPassword,
} from '../utilities/check';

const LoginForm = () => (
  <div>
    <h1>Welcome to React Testing Example!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        }
        else if (
          !checkEmail(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Required';
        } else if (!checkPassword(values.password)) {
          errors.password = 'Password is too simple';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
          <form onSubmit={handleSubmit}>
            <label>
              Email:
            <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>

            <div data-testid="error-email" style={{ 'color': 'red' }}>
              {errors.email && touched.email && errors.email}
            </div>

            <label>
              Password:
            <input
                type="password"
                name="password"
                placeholder="password here"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </label>

            <div data-testid="error-password" style={{ 'color': 'red' }}>
              {errors.password && touched.password && errors.password}
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </form>
        )}
    </Formik>
  </div>
);

export default LoginForm;