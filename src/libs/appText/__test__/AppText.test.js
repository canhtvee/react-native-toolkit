import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react-native';

import {AppContextProvider} from '../../../utils';

import {AppText} from '../index';

/**
 * Run test command
 * yarn test -u -t="AppText"
 */

afterAll(cleanup);

describe('AppText', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppContextProvider>
        <AppText style={{color: 'black'}}>should render correctly</AppText>{' '}
      </AppContextProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  test('should invoke onPressMock if pressed', () => {
    const onPressMock = jest.fn();

    const {getByText} = render(
      <AppContextProvider>
        <AppText style={{color: 'black'}} onPress={onPressMock}>
          onPress
        </AppText>
      </AppContextProvider>,
    );

    const textElement = getByText('onPress');
    fireEvent.press(textElement);
    expect(onPressMock).toHaveBeenCalled();
  });
});
