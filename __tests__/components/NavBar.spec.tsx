import 'react-native';
import React from 'react';
import NavBar from '../../src/components/NavBar';
import {render, screen} from '../../src/test/test-utils';

it('renders correctly', () => {
  render(<NavBar />);
  expect(screen.toJSON()).toMatchSnapshot();
});

// it('renders correctly and displays message', async () => {
//   await render(<NavBar item={expectedItem} />);
//   const outputTitle = await screen.getByText(expectedItem.title);
//   // screen.debug.shallow();
//   expect(outputTitle).toMatch(expectedItem.title);
// });
