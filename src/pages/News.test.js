import React from 'react';
import { render, screen, act, waitForElementToBeRemoved, within } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import News from './News';
import mockNews from '../helpers/__mocks__/mockPosts_music.json';
import getNews from '../helpers/getNews';

// mock the API call in the component 
jest.mock('../helpers/getNews');

// setup for testing environment
const setup = (component, state, data) => {
  if (state === 'pass') {
    getNews.mockResolvedValueOnce(data);
  } else if (state === 'fail') {
    getNews.mockRejectedValue(new Error(data[0]));
  }

  return (
    render(
      <Router>
        {component}
      </Router>
    ))
};


describe('News Page', () => {
  afterEach(() => jest.clearAllMocks());

  test('load title and show status', async () => {
    setup(<News />, 'pass', mockNews);
    screen.getByText('What is News Lately?');
    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));

    screen.getByRole("table");
    expect(getNews).toHaveBeenCalledTimes(1);

  });

  test('load news from api correctly', async () => {
    setup(<News />, 'pass', mockNews);
    screen.getByText('What is News Lately?');

    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));

    screen.getByRole("table");
    const rows = screen.getAllByRole("row");

    mockNews.forEach((post, index) => {
      const row = rows[index + 1];
      within(row).getByText(post.title);
      within(row).getByText(post.author);
    })

    expect(getNews).toHaveBeenCalledTimes(1);

  });


  test('load news with network errors', async () => {
    setup(<News />, 'fail', ['network error']);
    screen.getByText('What is News Lately?');

    await waitForElementToBeRemoved(() => screen.getByText('Loading news ...'));
    screen.getByText('network error');

    expect(getNews).toHaveBeenCalledTimes(1);
  })
});