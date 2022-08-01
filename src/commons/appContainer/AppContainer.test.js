import React from 'react';
import {Text} from 'react-native';

import {cleanup} from '@testing-library/react-native';
import {create} from 'react-test-renderer';

import {AppContainer} from './index';

/**
 * Run test command
 * yarn test -u -t="AppContainer"
 */

afterEach(cleanup);

describe('AppContainer', () => {
  test('should render loading view', () => {
    const module = jest.requireActual('@react-native-community/hooks');
    jest.spyOn(module, 'useInteractionManager').mockImplementation(() => false);

    const component = create(
      <AppContainer
        style={{backgroundColor: 'red'}}
        edges={['bottom', 'left', 'right']}>
        <Text>AppContainer Test</Text>
      </AppContainer>,
    );
    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findByProps({type: 'Circle'})).toBeDefined();
    expect(component.root.findAllByType('Text').length).toEqual(0);
  });

  test('should render children', () => {
    const module = jest.requireActual('@react-native-community/hooks');
    jest.spyOn(module, 'useInteractionManager').mockImplementation(() => true);

    const component = create(
      <AppContainer
        style={{backgroundColor: 'red'}}
        edges={['bottom', 'left', 'right']}>
        <Text>AppContainer Test</Text>
      </AppContainer>,
    );

    expect(component.toJSON()).toMatchSnapshot();
    expect(component.root.findAllByProps({type: 'Circle'}).length).toEqual(0);
    expect(component.root.findByType('Text').children).toEqual([
      'AppContainer Test',
    ]);
  });
});
