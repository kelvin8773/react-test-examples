import React from 'react';
import { Formik } from 'formik';
import {
  checkName,
  checkEmail,
  checkPassword,
} from '../utilities/check';

const SignupForm = () => (
  <div>
    <h1>Anywhere in your app!</h1>
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name is Required'
        } else if (!checkName(values.name)) {
          errors.name = `invalid name`;
        }

        if (!values.email) {
          errors.email = 'Email is Required';
        }
        else if (!checkEmail(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Password is Required';
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
              Name:
            <input
                type="text"
                name="name"
                placeholder="Enter your name here"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </label>

            <p> {errors.name && touched.name && errors.name} </p>

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
            <p>
              {errors.email && touched.email && errors.email}
            </p>

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

            <p>
              {errors.password && touched.password && errors.password}
            </p>

            <button type="submit" disabled={isSubmitting}>
              Submit
          </button>
          </form>
        )}
    </Formik>
  </div>
);

export default SignupForm;