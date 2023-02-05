import {RouteProp} from '@react-navigation/native';
import {Priority, SortBy, Status} from '../constants/constants';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface ITodo {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFilters {
  status: string;
  name: SortBy;
  priority: SortBy;
}

export interface Response {
  message: string;
  item?: ITodo;
  error?: any;
}

export type TodoContextType = {
  data: ITodo[];
  mapped: MappedTodoType;
  filters: IFilters;
  isLoading: boolean;
  createTodo: (todo: ITodo) => Promise<Response>;
  updateTodo: (todo: ITodo) => Promise<Response>;
  updateStatus: (
    id: string,
    status: Status,
    showToast?: boolean,
  ) => Promise<Response>;
  setFilters: (filters: IFilters) => void;
};

export type MappedTodoType = {[key: string]: {count: number; items: ITodo[]}};

export type RootStackParamList = {
  Main: undefined;
  CreateTask: {item: ITodo} | undefined;
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;
