import 'react-native';
import React from 'react';
import EmptyList from '../../src/components/EmptyList';
import {render, screen} from '../../src/test/test-utils';

describe('EmptyList', () => {
  it('renders correctly', () => {
    const expectedMessage = 'Empty List';
    render(<EmptyList message={expectedMessage} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly and displays message', async () => {
    const expectedMessage: string = 'Empty List';
    render(<EmptyList message={expectedMessage} />);
    screen.debug.shallow();
    const ad = await screen.findByText(expectedMessage);
    expect(ad).toContain(expectedMessage);
  });
});
