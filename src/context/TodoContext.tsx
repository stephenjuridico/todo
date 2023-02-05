import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {IFilters, ITodo, MappedTodoType, TodoContextType} from '../@types/todo';
import {SortBy, Status} from '../constants/constants';
import moment from 'moment';
import {successToast} from '../utils/useToast';
import * as R from 'ramda';

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: FC<{children: ReactNode}> = ({children}) => {
  const todoProvider = useTodoProvider();
  return (
    <TodoContext.Provider value={todoProvider}>{children}</TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext) as TodoContextType;
};

const initialMappedValue: MappedTodoType = {
  all: {count: 0, items: []},
  [Status.Pending]: {count: 0, items: []},
  [Status.Completed]: {count: 0, items: []},
  [Status.Archived]: {count: 0, items: []},
};

const useTodoProvider = () => {
  const [todo, setTodo] = useState<ITodo[]>([]);
  const [mapped, setMapped] = useState<MappedTodoType>(initialMappedValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<IFilters>({
    status: 'all',
    priority: SortBy.DESC,
    name: SortBy.ASC,
  });

  const saveData = useCallback(async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('todo', JSON.stringify(todo));
      setIsLoading(false);
    } catch (error) {
      console.log('saveData:Error', error);
      setIsLoading(false);
    }
  }, [todo]);

  useEffect(() => {
    // Clone initialValue to reset values upon update to disable duplicate
    const updatedMapped = R.clone(initialMappedValue);
    updatedMapped.all = {count: todo.length, items: todo};
    todo.forEach(val => {
      updatedMapped[val.status].count += 1;
      updatedMapped[val.status].items.push(val);
    });

    // const reduced: MappedTodoType = todo.reduce((a, v: ITodo) => {
    //   const aa = {...a};
    //   if (aa[v.status]) {
    //     aa[v.status].count += 1;
    //     aa[v.status].items.push(v);
    //   } else {
    //     aa[v.status] = {count: 1, items: [v]};
    //   }
    //   return aa;
    // }, {} as MappedTodoType);
    setMapped(updatedMapped);
  }, [todo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const savedTodo = await AsyncStorage.getItem('todo');
        if (savedTodo) {
          console.log('parse', JSON.parse(savedTodo));
          setTodo(JSON.parse(savedTodo));
        }
        setIsLoading(false);
      } catch (error) {
        console.log('fetchData', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = () => {
    let updated: ITodo[] = [];
    if (filters.status !== 'all') {
      filters.status.split(',').forEach(s => {
        updated = updated.concat(mapped[s].items);
      });
    } else {
      updated = mapped.all.items;
    }

    const titlePrioritySort = R.sortWith([
      R[filters.priority]<ITodo>(R.prop('priority')),
      R[filters.name]<ITodo>(R.prop('title')),
    ]);

    return titlePrioritySort(updated);
  };

  const createTodo = async (payload: ITodo) => {
    console.log('Create Todo', payload);
    try {
      setIsLoading(true);
      payload.createdAt = moment().format('LLL');
      setTodo([...todo, payload]);
      await saveData();
      setIsLoading(false);
      return {message: 'Successfully created task', todo: payload};
    } catch (err) {
      setIsLoading(false);
      // throw err;
      return {message: 'Failed to created task', error: err};
    }
  };

  const updateTodo = async (payload: ITodo) => {
    try {
      setIsLoading(true);
      const updated = [...todo];
      payload.updatedAt = moment().format('LLL');
      const idx = updated.findIndex((v: ITodo) => v.id === payload.id);
      if (idx !== -1) {
        updated[idx] = payload;
      }
      setTodo(updated);
      await saveData();
      setIsLoading(false);
      return {message: 'Successfully updated task', todo: payload};
    } catch (err) {
      setIsLoading(false);
      // throw err;
      return {message: 'Failed to update task', error: err};
    }
  };

  const updateStatus = async (
    id: string,
    status: Status,
    showToast = false,
  ) => {
    try {
      setIsLoading(true);
      const updated = [...todo];
      const idx = updated.findIndex((v: ITodo) => v.id === id);
      if (idx !== -1) {
        updated[idx] = {
          ...updated[idx],
          status: status,
          updatedAt: moment().format('LLL'),
        };
      }
      setTodo(updated);
      await saveData();
      setIsLoading(false);
      if (showToast) {
        successToast('Success', `Successfully ${status} task`);
      }
      return {message: `Successfully ${status} task`, todo: updated[idx]};
    } catch (err) {
      setIsLoading(false);
      // throw err;
      return {message: `Failed to ${status} task`, error: err};
    }
  };

  console.log('Filters', filters);

  return {
    data: data(),
    mapped,
    isLoading,
    createTodo,
    updateTodo,
    updateStatus,
    filters,
    setFilters,
  };
};
