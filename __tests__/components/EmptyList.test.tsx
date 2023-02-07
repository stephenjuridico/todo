import 'react-native';
import React from 'react';
import EmptyList from '../../src/components/EmptyList';
import {render, screen} from '../../src/test/test-utils';

describe('EmptyList', () => {
  const expectedMessage = 'Empty List';
  const testId = 'empty-list-message';

  it('renders correctly', () => {
    render(<EmptyList message={expectedMessage} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly and displays message', () => {
    render(<EmptyList message={expectedMessage} />);
    expect(screen.getByTestId(testId).children).toContain(expectedMessage);
  });
});
