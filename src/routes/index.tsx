import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Main, CreateTask} from '../screens';
import {RootStackParamList} from '../@types/todo.d';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="CreateTask" component={CreateTask} />
    </Stack.Navigator>
  );
};

export default Routes;
