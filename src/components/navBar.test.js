import React from 'react';

import {
  BrowserRouter as Router,
} from "react-router-dom";


import { render, screen } from '@testing-library/react';
import NavBar from './navBar';

const links = [
  { text: 'Home', location: "/" },
  { text: 'News', location: "/news" },
  { text: 'Project', location: "/project" },
  { text: 'Blog', location: "/blog" },
  { text: 'About', location: "/about" },
];

describe('NavBar', () => {
  const setup = (component) => (
    render(
      <Router>
        {component}
      </Router>
    )
  )

  test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      setup(<NavBar />);
      const linkDom = screen.getByText(link.text);
      expect(linkDom).toHaveAttribute("href", link.location);
    }
  );

  test('Check if have logo and link to home page', () => {
    setup(<NavBar />);
    const logoDom = screen.getByTestId(/company-logo/);
    expect(logoDom).toHaveAttribute("href", "/");
    expect(screen.getByAltText(/Company Logo/)).toBeInTheDocument();
  });

})