import React from 'react';

import {render, cleanup} from '@testing-library/react-native';

import {AppAsyncImage} from './AppAsyncImage';
import {AppContextProvider} from '../../utils';

/**
 * Run test command
 * yarn test -u -t="AppImageRemote"
 */

afterAll(cleanup);

describe('AppImageRemote', () => {
  test('should render correctly', () => {
    const tree = render(
      <AppContextProvider>
        <AppAsyncImage
          source={{
            uri: 'https://i.pinimg.com/564x/7c/93/2e/7c932e5fc8a86804082cd22203455f8f.jpg',
          }}
          style={{
            backgroundColor: 'red',
            margin: 20,
          }}
        />
      </AppContextProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
