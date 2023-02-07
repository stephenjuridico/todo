import React, {forwardRef, useImperativeHandle} from 'react';
import {
  Box,
  HStack,
  Icon,
  Text,
  useDisclose,
  IconButton,
  Actionsheet,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useTodo} from '../context/TodoContext';
import {SortBy} from '../constants/constants';

const SortFilter = forwardRef((props, ref) => {
  const {isOpen, onClose, onToggle} = useDisclose();
  const {filters, setFilters} = useTodo();

  useImperativeHandle(
    ref,
    () => {
      return {
        toggle() {
          onToggle();
        },
      };
    },
    [onToggle],
  );

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text bold fontSize="16">
            Sort By
          </Text>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text>Title</Text>
            <IconButton
              borderRadius={'full'}
              testID="btnSortByName"
              onPress={() =>
                setFilters({
                  ...filters,
                  name: filters.name === SortBy.ASC ? SortBy.DESC : SortBy.ASC,
                })
              }
              icon={
                <Icon
                  as={Feather}
                  name={filters.name === SortBy.ASC ? 'arrow-up' : 'arrow-down'}
                />
              }
            />
          </HStack>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text>Priority</Text>
            <IconButton
              testID="btnSortByPriority"
              borderRadius={'full'}
              onPress={() =>
                setFilters({
                  ...filters,
                  priority:
                    filters.priority === SortBy.ASC ? SortBy.DESC : SortBy.ASC,
                })
              }
              icon={
                <Icon
                  as={Feather}
                  name={
                    filters.priority === SortBy.ASC ? 'arrow-up' : 'arrow-down'
                  }
                />
              }
            />
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
});

export default SortFilter;
