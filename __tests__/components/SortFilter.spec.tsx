import 'react-native';
import React from 'react';
import SortFilter from '../../src/components/SortFilter';
import {render, screen} from '../../src/test/test-utils';

it('renders correctly', () => {
  render(<SortFilter />);
  expect(screen.toJSON()).toMatchSnapshot();
});

// it('renders correctly and displays message', async () => {
//   await render(<SortFilter item={expectedItem} />);
//   const outputTitle = await screen.getByText(expectedItem.title);
//   // screen.debug.shallow();
//   expect(outputTitle).toMatch(expectedItem.title);
// });
