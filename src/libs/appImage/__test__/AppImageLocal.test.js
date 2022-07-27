import React from 'react';
import {Image, View} from 'react-native';
import {render, cleanup} from '@testing-library/react-native';

import {AppImageLocal} from '../AppImageLocal';

/**
 * Run test command
 * yarn test -u -t="AppImageLocal"
 */

afterAll(cleanup);

describe('AppImageLocal', () => {
  test('should render correctly', () => {
    const tree = render(
      <View>
        <AppImageLocal name="app_logo" />
      </View>,
    );

    expect(tree).toMatchSnapshot();
  });
});
