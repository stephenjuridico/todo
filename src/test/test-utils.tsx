import React, {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/theme';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {TodoProvider} from '../context/TodoContext';
import {NavigationContainer} from '@react-navigation/native';

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <AlertNotificationRoot>
          <TodoProvider>{children}</TodoProvider>
        </AlertNotificationRoot>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
