import 'react-native';
import React from 'react';
import {render, screen} from '../../src/test/test-utils';
import Main from '../../src/screens/Main';
import {
  ITodo,
  MainScreenNavigationProp,
  TodoContextType,
} from '../../src/@types/todo';
import {
  initialFiltersValue,
  initialMappedValue,
  TodoProvider,
} from '../../src/context/TodoContext';

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

  const contextValues = {
    data: [],
    mapped: initialMappedValue,
    isLoading: false,
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    updateStatus: jest.fn(),
    filters: initialFiltersValue,
    setFilters: jest.fn(),
  } as TodoContextType;

  const renderMain = (values = contextValues) => {
    render(
      <TodoProvider value={values}>
        <Main navigation={navigation as MainScreenNavigationProp} />
      </TodoProvider>,
    );
  };

  it('renders correctly', () => {
    renderMain();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders correctly and shows empty list', () => {
    // const emptyMessage =
    //   'No items added yet.\n Click "New Task" to create one.';
    // renderMain();
    // expect(screen.getByText(emptyMessage)).toContain(emptyMessage);
  });
});
