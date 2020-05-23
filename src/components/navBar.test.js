import React from 'react';
import { render } from '@testing-library/react';
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
    const { getByText } = render(<NavBar />);
    const linkDom = getByText(link.text);
    expect(linkDom.getAttribute("href")).toBe(link.location);
  }
);

test('Check if have logo and link to home page', () => {
  const { getByAltText, getByTestId } = render(<NavBar />);
  const logoDom = getByTestId(/company-logo/);
  expect(logoDom.getAttribute("href")).toBe("/");
  expect(getByAltText(/Company Logo/)).toBeInTheDocument();
});
