import React from 'react';
import {Center, Text} from 'native-base';

interface EmptyListProps {
  message: string;
}

const EmptyList: React.FC<EmptyListProps> = ({message}) => {
  return (
    <Center minH={200} flex={1}>
      <Text
        testID="empty-list-message"
        width={'80%'}
        textAlign={'center'}
        color={'gray.400'}>
        {message}
      </Text>
    </Center>
  );
};

export default EmptyList;
