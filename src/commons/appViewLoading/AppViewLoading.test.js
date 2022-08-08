import React from 'react';
import {render, cleanup} from '@testing-library/react-native';
import {AppViewLoading} from './index';

/**
 * Run test command
 * yarn test -u -t="AppViewLoading"
 */

afterAll(cleanup);

describe('AppViewLoading', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppViewLoading
        containerStyle={{backgroundColor: 'red', margin: 30}}
        spinnerSize={80}
        spinnerColor={'blue'}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
