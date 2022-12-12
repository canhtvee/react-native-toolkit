import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
import {create} from 'react-test-renderer';

import {AppIcon} from './AppIcon';

/**
 * Run test command
 * yarn test -u -t="AppIcon"
 */

afterAll(cleanup);

describe('AppIcon', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppIcon
        name={'camera'}
        size={80}
        color={'red'}
        iconStyle={{backgroundColor: 'blue'}}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
        touchStyle={{margin: 20, backgroundColor: 'white'}}
        activeOpacity={0.5}
        onPress={() => {}}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();
    const {root} = create(
      <AppIcon
        name={'arrowLeft'}
        size={80}
        color={'red'}
        iconStyle={{backgroundColor: 'blue'}}
        hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
        touchStyle={{margin: 20, backgroundColor: 'white'}}
        activeOpacity={0.5}
        onPress={onPressMock}
      />,
    );
    const touchElement = root.findByProps({allowFontScaling: false});
    fireEvent.press(touchElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});
