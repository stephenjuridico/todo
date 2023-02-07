import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {TodoProvider, useTodoProvider} from './context/TodoContext';
import {theme} from './theme/theme';
import Routes from './routes';

const App = () => {
  const context = useTodoProvider();
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <AlertNotificationRoot>
          <TodoProvider value={context}>
            <Routes />
          </TodoProvider>
        </AlertNotificationRoot>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
