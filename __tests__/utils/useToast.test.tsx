import React from 'react';
import 'react-native';
import {act, render, screen, waitFor} from '../../src/test/test-utils';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {Text} from 'native-base';
import {successToast, errorToast} from '../../src/utils/useToast';

describe('Utils/useToast', () => {
  it('render and show a success toast', async () => {
    render(
      <AlertNotificationRoot>
        <Text>Text</Text>
      </AlertNotificationRoot>,
    );
    act(() => {
      successToast('Success', 'Success Message');
    });

    await waitFor(() => expect(screen.getByText('Success')).toBeTruthy());
    await waitFor(() =>
      expect(screen.getByText('Success Message')).toBeTruthy(),
    );
  });

  it('render and show a error toast', async () => {
    render(
      <AlertNotificationRoot>
        <Text>Text</Text>
      </AlertNotificationRoot>,
    );
    act(() => {
      errorToast('Error', 'Error Message');
    });

    await waitFor(() => expect(screen.getByText('Error')).toBeTruthy());
    await waitFor(() => expect(screen.getByText('Error Message')).toBeTruthy());
  });
});
