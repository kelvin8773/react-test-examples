import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

xtest('demo testing', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
