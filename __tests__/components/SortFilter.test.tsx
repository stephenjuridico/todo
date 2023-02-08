import 'react-native';
import React from 'react';
import SortFilter from '../../src/components/SortFilter';
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '../../src/test/test-utils';
import {
  TodoProvider,
  useTodo,
  initialMappedValue,
  initialFiltersValue,
} from '../../src/context/TodoContext';
import {TodoContextType} from '../../src/@types/todo';
import {SortBy} from '../../src/constants/constants';

describe('SortFilter', () => {
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

  const renderSortFilter = () => {
    render(
      <TodoProvider value={contextValues}>
        <SortFilter />
      </TodoProvider>,
    );
  };

  it('renders correctly', async () => {
    renderSortFilter();
    await waitFor(() => {
      expect(screen.toJSON()).toMatchSnapshot();
    });
  });

  // it('renders correctly and displays default filters', () => {
  //   renderSortFilter();
  //   const btnSortByName = screen.getByTestId('btnSortByName');
  //   const btnSortByPriority = screen.getByTestId('btnSortByPriority');
  //   fireEvent.press(btnSortByName);
  //   fireEvent.press(btnSortByPriority);
  //   expect(contextValues.filters.priority).toBe(SortBy.DESC);
  //   expect(contextValues.filters.name).toBe(SortBy.ASC);
  // });

  // it('renders correctly and clicks sort by name', async () => {
  //   renderSortFilter();
  //   const btnSortByName = screen.getByTestId('btnSortByName');
  //   fireEvent.press(btnSortByName);
  //   expect(contextValues.setFilters).toBeCalled();
  // });

  // it('renders correctly and clicks sort by priority', async () => {
  //   renderSortFilter();
  //   const btnSortByPriority = screen.getByTestId('btnSortByPriority');
  //   fireEvent.press(btnSortByPriority);
  //   expect(contextValues.setFilters).toBeCalled();
  // });
});
