import React from 'react';

import {cleanup, fireEvent} from '@testing-library/react-native';
import {create} from 'react-test-renderer';

import {AppContextProvider} from '../../utils';
import {AppButtonNormal} from './index';

/**
 * Run test command
 * yarn test -u -t="AppButtonNormal"
 */

afterEach(cleanup);

describe('AppButtonNormal', () => {
  test('should render correctly', () => {
    const tree = create(
      <AppContextProvider>
        <AppButtonNormal
          label="AppButtonNormal Test"
          containerStyle={{padding: 50}}
        />
      </AppContextProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    expect(tree.root.findAllByType('Text').length).toEqual(1);
  });

  test('should invoke onPressMock if pressed ', () => {
    const onPressMock = jest.fn();
    const tree = create(
      <AppContextProvider>
        <AppButtonNormal
          label="AppButtonNormal Test"
          containerStyle={{padding: 50}}
          onPress={onPressMock}
        />
      </AppContextProvider>,
    );
    expect(tree.toJSON()).toMatchSnapshot();
    const touchElement = tree.root.findAllByType('Text');
    fireEvent.press(touchElement[0]);
    expect(onPressMock).toHaveBeenCalled();
  });

  // test('should render loading view if is loading ', () => {
  //   const onPressMock = jest.fn();
  //   const tree = render(
  //     <AppButtonNormal
  //       label="AppButtonNormal Test"
  //       style={{padding: 50}}
  //       icon={{name: 'camera', size: 20}}
  //       onPress={onPressMock}
  //       loading={true}
  //       loadingText={'loadingText'}
  //     />,
  //   );
  //   expect(tree.toJSON()).toMatchSnapshot();
  //   expect(tree.getByText('loadingText')).toBeDefined();
  //   fireEvent.press(tree.getByText('loadingText'));
  //   expect(onPressMock).not.toHaveBeenCalled();
  // });
});
