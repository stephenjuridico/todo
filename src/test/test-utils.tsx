import React from 'react';
import {render} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {TodoProvider} from '../context/TodoContext';

const AllTheProviders = ({children}) => {
  return (
    <NativeBaseProvider theme={theme}>
      <AlertNotificationRoot>
        <TodoProvider>{children}</TodoProvider>
      </AlertNotificationRoot>
    </NativeBaseProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
