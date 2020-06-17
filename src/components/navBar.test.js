import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './navBar';

const links = [
  { text: 'Home', location: "/" },
  { text: 'Project', location: "/project" },
  { text: 'Blog', location: "/blog" },
  { text: 'About', location: "/about" },
];

test.each(links)(
  "Check if Nav Bar have %s link.",
  (link) => {
    const { getByText } = render(<NavBar />);
    const linkDom = getByText(link.text);
    expect(linkDom).toHaveAttribute("href", link.location);
  }
);

test('Check if have logo and link to home page', () => {
  const { getByAltText, getByTestId } = render(<NavBar />);
  const logoDom = getByTestId(/company-logo/);
  expect(logoDom).toHaveAttribute("href", "/");
  expect(getByAltText(/Company Logo/)).toBeInTheDocument();
});
