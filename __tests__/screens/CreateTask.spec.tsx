import 'react-native';
import React from 'react';
import {fireEvent, render, screen} from '../../src/test/test-utils';
import CreateTask from '../../src/screens/CreateTask';
import {ITodo, RootRouteProps} from '../../src/@types/todo.d';

describe('CreateTask', () => {
  const expectedItem = {
    id: '123123',
    title: 'Test',
    description: 'Test Description',
    priority: 3,
    status: 'pending',
  } as ITodo;

  let routes: RootRouteProps<'CreateTask'>;

  it('renders correctly', () => {
    render(<CreateTask />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  // it('renders correctly and inputs title correctly', () => {
  //   render(<CreateTask routes={routes as RootRouteProps<'CreateTask'>} />);
  //   screen.debug.shallow();
  //   const title = screen.getByText('New Task');
  //   // fireEvent.changeText(title, expectedItem.title);
  //   // const updatedTitle = screen.getByTestId('inputTitle');
  //   // expect(updatedTitle).toContain(expectedItem.title);
  //   expect(title).toContain('New Task');
  // });
});
