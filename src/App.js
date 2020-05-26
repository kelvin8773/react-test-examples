import React from 'react';
import './App.css';
import NavBar from './components/navBar';
// import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <LoginForm /> */}
      <SignupForm />
    </div>
  );
}

export default App;
