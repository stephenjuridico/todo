import 'react-native';
import React from 'react';
import TodoListItem from '../../src/components/TodoListItem';
import {fireEvent, render, screen, waitFor} from '../../src/test/test-utils';
import {ITodo, TodoContextType} from '../../src/@types/todo';
import {
  TodoProvider,
  initialMappedValue,
  initialFiltersValue,
} from '../../src/context/TodoContext';
import {mockedNavigate} from '../../jest-setup';
import {Alert} from 'react-native';

describe('TodoListItem', () => {
  const expectedItem = {
    id: '123123',
    title: 'Test',
    description: 'Test Description',
    priority: 3,
    status: 'pending',
  } as ITodo;

  const mockedUpdateStatus = jest.fn();

  const renderTodo = () => {
    return render(
      <TodoProvider
        value={
          {
            data: [],
            mapped: initialMappedValue,
            isLoading: false,
            createTodo: jest.fn(),
            updateTodo: jest.fn(),
            updateStatus: mockedUpdateStatus,
            filters: initialFiltersValue,
            setFilters: jest.fn(),
          } as TodoContextType
        }>
        <TodoListItem item={expectedItem} />
      </TodoProvider>,
    );
  };

  it('renders correctly', async () => {
    renderTodo();
    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  it('renders correctly and show more actions', async () => {
    renderTodo();
    const btnTLIActions = screen.getByTestId('btnTLIActions');
    fireEvent.press(btnTLIActions);
    const btnTLIActionsEdit = screen.getByTestId('btnTLIActionsEdit');
    const btnTLIActionsUpdate = screen.getByTestId('btnTLIActionsUpdate');
    const btnTLIActionsArchive = screen.getByTestId('btnTLIActionsArchive');
    expect(btnTLIActionsEdit).toBeTruthy();
    expect(btnTLIActionsUpdate).toBeTruthy();
    expect(btnTLIActionsArchive).toBeTruthy();
  });

  it('renders correctly and navigates to edit', async () => {
    renderTodo();
    const btnTLIActions = screen.getByTestId('btnTLIActions');
    fireEvent.press(btnTLIActions);
    const btnTLIActionsEdit = screen.getByTestId('btnTLIActionsEdit');
    fireEvent.press(btnTLIActionsEdit);
    expect(mockedNavigate).toBeCalled();
  });

  it('renders correctly and updates status', async () => {
    renderTodo();
    const btnTLIActions = screen.getByTestId('btnTLIActions');
    fireEvent.press(btnTLIActions);
    const btnTLIActionsUpdate = screen.getByTestId('btnTLIActionsUpdate');

    fireEvent.press(btnTLIActionsUpdate);

    expect(mockedUpdateStatus).toBeCalled();
  });

  it('renders correctly and archives item', async () => {
    // const errorMessageText = {
    //   title: 'Archive Task',
    //   message: 'Are you sure you want to archive this task?',
    // };
    // jest
    //   .spyOn(Alert, 'alert')
    //   .mockImplementation(('title', 'message', [{tex: 'Cancel', style: 'cancel', onPress: jest.fn()}]) => {});

    renderTodo();
    Alert.alert = jest.fn();
    const btnTLIActions = screen.getByTestId('btnTLIActions');
    fireEvent.press(btnTLIActions);
    const btnTLIActionsArchive = screen.getByTestId('btnTLIActionsArchive');
    fireEvent.press(btnTLIActionsArchive);
    // expect(
    //   screen.getByText('Are you sure you want to archive this task?'),
    // ).toBeTruthy();
    // expect(Alert.alert).toHaveBeenCalledWith(
    //   'Archive Task',
    //   'Are you sure you want to archive this task?',
    //   [
    //     {text: 'Cancel', style: 'cancel', onPress: jest.fn()},
    //     {
    //       text: 'Delete Task',
    //       style: 'destructive',
    //       onPress: jest.fn(),
    //     },
    //   ],
    // );

    // expect(mockedUpdateStatus).toBeCalled();
  });
});
