import React from 'react';
import {HStack, IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();
  return (
    <HStack alignItems="center" alignContent="center">
      <IconButton
        testID="btnGoBack"
        onPress={() => navigation.goBack()}
        borderRadius={'full'}
        _icon={{
          as: Feather,
          name: 'arrow-left',
          size: 6,
          // color: 'white',
        }}
      />
    </HStack>
  );
};

export default NavBar;
