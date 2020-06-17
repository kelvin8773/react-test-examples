import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './components/navBar';
import Home from './pages/Home';
import News from './pages/News';
import Blog from './pages/Blog';
import Project from './pages/Project';
import About from './pages/About';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route path="/news">
            <News />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/project">
            <Project />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
