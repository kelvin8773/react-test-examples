import React from 'react';
import { render, screen, act, waitForElementToBeRemoved, within } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import News from './News';
import mockNews from '../helpers/__mocks__/mockPosts_music.json';

jest.mock('../helpers/getNews');

const setup = (component) => (
  render(
    <Router>
      {component}
    </Router>
  )
);

describe('News Page', () => {
  test('load title and show status', async () => {
    setup(<News />);
    screen.getByText('What is News Lately?');
    screen.getByText('Loading news ...');
    await act(() => Promise.resolve());
  });

  test('load news from api correctly', async () => {
    setup(<News />);
    screen.getByText('What is News Lately?');

    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));

    screen.getByRole("table");
    const rows = screen.getAllByRole("row");

    mockNews.forEach((post, index) => {
      const row = rows[index + 1];
      within(row).getByText(post.title);
      within(row).getByText(post.author);
    })

    // screen.debug();
  });

});