import 'react-native';
import React from 'react';
import NavBar from '../../src/components/NavBar';
import {fireEvent, render, screen} from '../../src/test/test-utils';
import {mockedGoBack} from '../../jest-setup';

it('renders correctly', () => {
  render(<NavBar />);
  expect(screen.toJSON()).toMatchSnapshot();
});

it('renders correctly and can go back', () => {
  render(<NavBar />);
  const btn = screen.getByTestId('btnGoBack');
  fireEvent.press(btn);
  expect(mockedGoBack).toBeCalled();
});
