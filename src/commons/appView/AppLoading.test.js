import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {AppLoading} from './index';

/**
 * Run test command
 * yarn test -u -t="AppLoading"
 */

afterAll(cleanup);

describe('AppLoading', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppLoading
        containerStyle={{backgroundColor: 'red', margin: 30}}
        spinnerSize={80}
        spinnerColor={'blue'}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
