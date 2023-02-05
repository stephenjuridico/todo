import 'react-native';
import React from 'react';
import TodoListItem from '../../src/components/TodoListItem';
import {render, screen} from '../../src/test/test-utils';
import {ITodo} from '../../src/@types/todo';

describe('TodoListItem', () => {
  const expectedItem = {
    id: '123123',
    title: 'Test',
    description: 'Test Description',
    priority: 3,
    status: 'pending',
  } as ITodo;

  it('renders correctly', () => {
    render(<TodoListItem item={expectedItem} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  // it('renders correctly and displays message', () => {
  //   render(<TodoListItem item={expectedItem} />);
  //   const outputTitle = screen.getByText(expectedItem.title);
  //   // screen.debug.shallow();
  //   expect(outputTitle).toMatch(expectedItem.title);
  // });
});
