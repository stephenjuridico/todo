import React, {FC} from 'react';
import {
  Box,
  HStack,
  Heading,
  Icon,
  Pressable,
  Stack,
  Text,
  VStack,
  Menu,
} from 'native-base';

import {PriorityColorCode, Status} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {ITodo, MainScreenNavigationProp} from '../@types/todo.d';

import Feather from 'react-native-vector-icons/Feather';
import {Alert} from 'react-native';
import {useTodo} from '../context/TodoContext';

interface TodoListItemProps {
  item: ITodo;
}

const TodoListItem: FC<TodoListItemProps> = ({item}) => {
  const {updateStatus} = useTodo();
  const navigation: MainScreenNavigationProp = useNavigation();
  const isCompleted = item.status === Status.Completed;
  const colorScheme = PriorityColorCode[item.priority];

  const trigger = (triggerProps: {_props: any; state: {open: boolean}}) => {
    return (
      <Pressable testID="btnTLIActions" {...triggerProps}>
        <Icon as={Feather} name="more-horizontal" />
      </Pressable>
    );
  };

  return (
    <Box bg="white" shadow={1} rounded="lg" mx={1} my={2} p={2}>
      <Stack space={2}>
        <HStack space={4} justifyContent={'space-between'}>
          <VStack flex={1}>
            <HStack space={2} alignItems={'center'}>
              <Heading
                strikeThrough={isCompleted}
                numberOfLines={1}
                size={'sm'}>
                {item.title}
              </Heading>
              <Icon as={Feather} name="flag" color={`${colorScheme}.500`} />
            </HStack>
            <Text color={'gray.400'} numberOfLines={2}>
              {item.description}
            </Text>
          </VStack>
          <Menu placement="left top" trigger={trigger}>
            <Menu.Item
              testID="btnTLIActionsEdit"
              onPress={() => navigation.navigate('CreateTask', {item})}>
              Edit
            </Menu.Item>
            <Menu.Item
              testID="btnTLIActionsUpdate"
              onPress={() =>
                updateStatus(
                  item.id,
                  item.status === Status.Pending
                    ? Status.Completed
                    : Status.Pending,
                  true,
                )
              }>
              {item.status === Status.Pending
                ? 'Mark as Done'
                : 'Mark as Pending'}
            </Menu.Item>
            {item.status !== Status.Archived && (
              <Menu.Item
                testID="btnTLIActionsArchive"
                onPress={() => {
                  Alert.alert(
                    'Archive Task',
                    'Are you sure you want to archive this task?',
                    [
                      {text: 'Cancel', style: 'cancel', onPress: () => {}},
                      {
                        text: 'Delete Task',
                        style: 'destructive',
                        onPress: () =>
                          updateStatus(item.id, Status.Archived, true),
                      },
                    ],
                  );
                }}>
                Archive
              </Menu.Item>
            )}
          </Menu>
        </HStack>
      </Stack>
    </Box>
  );
};

export default TodoListItem;
