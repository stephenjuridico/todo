import 'react-native';
import React from 'react';
import {render, screen} from '../../src/test/test-utils';
import Main from '../../src/screens/Main';
import {ITodo, MainScreenNavigationProp} from '../../src/@types/todo';

describe('Main', () => {
  let navigation: Partial<MainScreenNavigationProp>;

  beforeEach(() => {
    navigation = {
      dispatch: jest.fn(),
    };
  });

  const expectedItem = {
    id: '123123',
    title: 'Test',
    description: 'Test Description',
    priority: 3,
    status: 'pending',
  } as ITodo;

  it('renders correctly', () => {
    render(<Main navigation={navigation as MainScreenNavigationProp} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  // it('renders correctly and shows empty list', () => {
  //   const emptyMessage =
  //     'No items added yet.\n Click "New Task" to create one.';
  //   render(<Main navigation={navigation as MainScreenNavigationProp} />);

  //   expect(screen.getByText(emptyMessage)).toContain(emptyMessage);
  // });
});
