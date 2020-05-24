import React from 'react';

const Login = () => (
  <div className="loginForm">
    <h1>Welcome, please sign In!</h1>

    <form>
      <div className="inputGroup">
        <label>
          Email
          <input type="email" placeholder="Your Email" required />
        </label>
      </div>
      <div className="inputGroup">
        <label>
          Password
          <input type="password" placeholder="password here" required />
        </label>
      </div>

      <button>submit</button>
    </form>

  </div>
);

export default Login;