import React from 'react';
import {Text} from 'react-native';

import {render, fireEvent, cleanup} from '@testing-library/react-native';

import {AppTouchable} from '../index';

/**
 * Run test command
 * yarn test -u -t="AppTouchable"
 */

afterAll(cleanup);

describe('AppTouchable', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppTouchable activeOpacity={0.8} testID="pressable">
        <Text>TestingAppTouchable</Text>
      </AppTouchable>,
    );
    expect(tree).toMatchSnapshot();
  });

  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <AppTouchable onPress={onPressMock} testID="pressable">
        <Text>Press AppTouchable</Text>
      </AppTouchable>,
    );
    //
    const pressable = getByTestId('pressable');
    fireEvent.press(pressable);
    expect(onPressMock).toHaveBeenCalled();
  });
});
