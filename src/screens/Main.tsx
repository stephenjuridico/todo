import React, {FC, useRef} from 'react';
import {
  AddIcon,
  Button,
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  IconButton,
  Badge,
  Divider,
} from 'native-base';
import moment from 'moment';
import {useTodo} from '../context/TodoContext';
import {MainScreenNavigationProp} from '../@types/todo';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native';
import {ITodo} from '../@types/todo.d';
import {capitalize} from '../utils/string';
import EmptyList from '../components/EmptyList';
import SortFilter from '../components/SortFilter';
import TodoListItem from '../components/TodoListItem';

const Main: FC<{navigation: MainScreenNavigationProp}> = ({navigation}) => {
  const {data, filters, setFilters, mapped} = useTodo();

  const sortFilterRef = useRef<{toggle: () => void} | null>(null);

  const renderItem = ({item}: {item: ITodo}) => <TodoListItem item={item} />;

  const renderEmptyList = () => (
    <EmptyList
      message={'No items added yet.\n Click "New Task" to create one.'}
    />
  );

  return (
    <VStack space={4} safeArea px={4} flex={1}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <VStack>
          <Heading>Today's Task</Heading>
          <Text color={'gray.500'}>{moment().format('dddd, D MMMM')}</Text>
        </VStack>

        <Button
          onPress={() => navigation.navigate('CreateTask')}
          variant={'subtle'}
          leftIcon={<AddIcon />}
          size={'md'}>
          New Task
        </Button>
      </HStack>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        {Object.keys(mapped).map((k, i) => {
          const selected = filters.status === k;
          return (
            <HStack key={k} justifyContent={'center'} space={2}>
              {i !== 0 && <Divider orientation="vertical" h="20px" />}
              <TouchableOpacity
                onPress={() =>
                  setFilters({
                    ...filters,
                    status: k,
                  })
                }>
                <HStack space={1} alignItems={'center'}>
                  <Text
                    color={selected ? 'primary.500' : 'gray.400'}
                    fontSize={'xs'}>
                    {capitalize(k)}
                  </Text>
                  <Badge
                    _text={{fontSize: '2xs', color: 'white'}}
                    px={'4px'}
                    py={'2px'}
                    bg={selected ? 'primary.500' : 'gray.300'}
                    rounded={'full'}>
                    {mapped[k].count}
                  </Badge>
                </HStack>
              </TouchableOpacity>
            </HStack>
          );
        })}
        <IconButton
          borderRadius={'full'}
          onPress={() => sortFilterRef?.current?.toggle()}
          icon={<Icon as={Feather} name="filter" />}
        />
      </HStack>
      <FlatList
        data={data}
        ListEmptyComponent={renderEmptyList}
        renderItem={renderItem}
      />
      <SortFilter ref={sortFilterRef} />
    </VStack>
  );
};

export default Main;
