import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

export const successToast = (title: string, message: string) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: title,
    textBody: message,
  });
};

export const errorToast = (title: string, message: string) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: title,
    textBody: message,
  });
};
