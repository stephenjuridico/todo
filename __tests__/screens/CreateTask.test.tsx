import 'react-native';
import React from 'react';
import {fireEvent, render, screen, waitFor} from '../../src/test/test-utils';
import CreateTask from '../../src/screens/CreateTask';
import {ITodo, TodoContextType} from '../../src/@types/todo';
import {
  TodoProvider,
  initialFiltersValue,
  initialMappedValue,
} from '../../src/context/TodoContext';
import {mockedRouteParam} from '../../jest-setup';

describe('CreateTask', () => {
  const expectedItem = {
    id: '123123',
    title: 'Test',
    description: 'Test Description',
    priority: 3,
    status: 'pending',
  } as ITodo;

  const mockedCreateTodo = jest.fn();
  const mockedUpdateTodo = jest.fn();

  const contextValues = {
    data: [],
    mapped: initialMappedValue,
    isLoading: false,
    createTodo: mockedCreateTodo,
    updateTodo: mockedUpdateTodo,
    updateStatus: jest.fn(),
    filters: initialFiltersValue,
    setFilters: jest.fn(),
  } as TodoContextType;

  const renderCreateTask = () => {
    render(
      <TodoProvider value={contextValues}>
        <CreateTask />
      </TodoProvider>,
    );
  };

  it('renders correctly', () => {
    renderCreateTask();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('show inputs correctly', () => {
    renderCreateTask();
    const title = screen.getByText('New Task');
    const inputTitle = screen.getByTestId('inputTitle');
    const inputDescription = screen.getByTestId('inputDescription');
    const inputStatus = screen.queryByTestId('inputStatus');
    const btnPriorityHigh = screen.getByTestId('btnPriorityHigh');
    const btnPriorityMedium = screen.getByTestId('btnPriorityMedium');
    const btnPriorityLow = screen.getByTestId('btnPriorityLow');
    const btnPriorityNone = screen.getByTestId('btnPriorityNone');
    const btnSubmit = screen.getByTestId('btnSubmit');

    expect(title).toBeTruthy();
    expect(inputTitle).toBeTruthy();
    expect(inputDescription).toBeTruthy();
    expect(inputStatus).toBeFalsy();
    expect(btnPriorityHigh).toBeTruthy();
    expect(btnPriorityMedium).toBeTruthy();
    expect(btnPriorityLow).toBeTruthy();
    expect(btnPriorityNone).toBeTruthy();
    expect(btnSubmit).toBeTruthy();
  });

  it('shows required fields', async () => {
    renderCreateTask();
    const btnSubmit = screen.getByTestId('btnSubmit');
    fireEvent.press(btnSubmit);

    const required = await screen.findAllByText('Required Field');
    // Only to required fields (Title and Description)
    expect(required).toHaveLength(2);
  });

  // it('create task', async () => {
  //   renderCreateTask();
  //   const inputTitle = screen.getByTestId('inputTitle');
  //   const inputDescription = screen.getByTestId('inputDescription');
  //   const btnSubmit = screen.getByTestId('btnSubmit');

  //   fireEvent.changeText(inputTitle, expectedItem.title);
  //   fireEvent.changeText(inputDescription, expectedItem.description);

  //   expect(inputTitle).toMatch(expectedItem.title);
  //   expect(inputDescription).toMatch(expectedItem.description);

  //   fireEvent.press(btnSubmit);
  //   // Only to required fields (Title and Description)
  //   expect(mockedCreateTodo).toBeCalled();
  // });

  // it('edit task and show prefilled inputs correctly', () => {
  //   mockedRouteParam.mockReturnValue({params: {item: expectedItem}});
  //   renderCreateTask();
  //   const title = screen.getByText('New Task');
  //   const inputTitle = screen.getByTestId('inputTitle');
  //   const inputDescription = screen.getByTestId('inputDescription');
  //   const inputStatus = screen.queryByTestId('inputStatus');
  //   const btnPriorityHigh = screen.getByTestId('btnPriorityHigh');
  //   const btnPriorityMedium = screen.getByTestId('btnPriorityMedium');
  //   const btnPriorityLow = screen.getByTestId('btnPriorityLow');
  //   const btnPriorityNone = screen.getByTestId('btnPriorityNone');
  //   const btnSubmit = screen.getByTestId('btnSubmit');

  //   expect(title).toBeTruthy();
  //   expect(inputTitle).toBeTruthy();
  //   expect(inputDescription).toBeTruthy();
  //   expect(inputStatus).toBeTruthy();
  //   expect(btnPriorityHigh).toBeTruthy();
  //   expect(btnPriorityMedium).toBeTruthy();
  //   expect(btnPriorityLow).toBeTruthy();
  //   expect(btnPriorityNone).toBeTruthy();
  //   expect(btnSubmit).toBeTruthy();
  // });
});
