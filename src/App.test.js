import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('snapShot testing', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
