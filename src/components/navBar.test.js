import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './navBar';

const links = [
  { text: 'Home', location: "/" },
  { text: 'Contact', location: "/contact" },
  { text: 'About', location: "/about" },
  { text: 'Search', location: "/search" },
];

test.each(links)(
  "Check if Nav Bar have %s link.",
  (link) => {
    render(<NavBar />);
    const linkDom = screen.getByText(link.text);
    expect(linkDom).toHaveAttribute("href", link.location);
  }
);

test('Check if have logo and link to home page', () => {
  render(<NavBar />);
  const logoDom = screen.getByTestId(/company-logo/);
  expect(logoDom).toHaveAttribute("href", "/");
  expect(screen.getByAltText(/Company Logo/)).toBeInTheDocument();
});
