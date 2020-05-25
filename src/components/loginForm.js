import React from 'react';
import { Formik } from 'formik';

const LoginForm = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        }
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Required';
        } else if (
          !/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password)) {
          // refer link - https://www.itworld.com/article/2833081/how-to-validate-password-strength-using-a-regular-expression.html
          // The password length must be greater than or equal to 8
          // The password must contain one or more uppercase characters
          // The password must contain one or more lowercase characters
          // The password must contain one or more numeric values
          // The password must contain one or more special characters
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </label>

            <div data-testid="error-email" >
              {errors.email && touched.email && errors.email}
            </div>

            <label>
              Password:
            <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </label>

            <div data-testid="error-password" >
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