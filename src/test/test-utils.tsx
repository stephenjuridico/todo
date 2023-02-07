import React, {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react-native';
import {NativeBaseProvider} from 'native-base';
import {theme} from '../theme/theme';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {TodoProvider} from '../context/TodoContext';
import {NavigationContainer} from '@react-navigation/native';

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  const inset = {
    frame: {x: 0, y: 0, width: 0, height: 0},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
        {/* <AlertNotificationRoot>
          <TodoProvider>{children}</TodoProvider>
        </AlertNotificationRoot> */}
        {children}
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
