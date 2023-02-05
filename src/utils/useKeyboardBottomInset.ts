import React from 'react';
import {EmitterSubscription, Keyboard, Platform} from 'react-native';

// Workaround for action sheets being covered by keyboard
// https://github.com/GeekyAnts/NativeBase/issues/3939#issuecomment-895769861
const useKeyboardBottomInset = () => {
  const [bottom, setBottom] = React.useState(0);
  const subscriptions = React.useRef<EmitterSubscription[]>([]);

  React.useEffect(() => {
    function onKeyboardChange(e: any) {
      if (
        e.startCoordinates &&
        e.endCoordinates.screenY < e.startCoordinates.screenY
      ) {
        setBottom(e.endCoordinates.height);
      } else {
        setBottom(0);
      }
    }

    if (Platform.OS === 'ios') {
      subscriptions.current = [
        Keyboard.addListener('keyboardWillChangeFrame', onKeyboardChange),
      ];
    } else {
      subscriptions.current = [
        Keyboard.addListener('keyboardDidHide', onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', onKeyboardChange),
      ];
    }
    return () => {
      subscriptions.current.forEach(subscription => {
        subscription.remove();
      });
    };
  }, [setBottom, subscriptions]);

  return bottom;
};

export default useKeyboardBottomInset;
