import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import News from './News';

jest.mock('../helpers/getNews');

describe('News Page', () => {
  const setup = (component) => (
    render(
      <Router>
        {component}
      </Router>
    )
  );

  test('load title and show status', async () => {
    setup(<News />);
    screen.getByText('What is News Lately?');
    screen.getByText('Loading news ...');
    await act(() => Promise.resolve());
  });


});