import React from 'react';
import App from './App';

import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);


describe('App', () => {
  test('should have no accessiblity violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('snapShot testing', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});




