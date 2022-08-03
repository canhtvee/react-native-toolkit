import React from 'react';
import {useForm} from 'react-hook-form';
import {create} from 'react-test-renderer';
import {render, cleanup, fireEvent} from '@testing-library/react-native';

import {AppContextProvider} from '../../utils';

import {AppInputText} from './AppInputText';

/**
 * Run test command
 * yarn test -u -t="AppInputText"
 */

afterEach(cleanup);

describe('AppInputText', () => {
  test('should render both label and icon', () => {
    const RenderingElement = () => {
      const methods = useForm({
        defaultValues: {AppInputText: 'defaultValues'},
      });
      return (
        <AppContextProvider>
          <AppInputText
            {...methods}
            name="AppInputText"
            label="AppInputText"
            placeholder="placeholder"
            style={{
              backgroundColor: 'white',
            }}
            secureTextEntry
          />
        </AppContextProvider>
      );
    };

    const tree = render(<RenderingElement />);
    expect(tree).toMatchSnapshot();
    expect(tree.getByText('AppInputText')).toBeDefined();
    expect(tree.getByPlaceholderText('placeholder').props.value).toBe(
      'defaultValues',
    );
    expect(tree.getByText('')).toBeDefined();
  });
  /**
   *
   */
  test('should render only input', () => {
    const RenderingElement = () => {
      const methods = useForm();
      return (
        <AppContextProvider>
          <AppInputText
            {...methods}
            name="AppInputText"
            placeholder="placeholder"
          />
        </AppContextProvider>
      );
    };

    const tree = create(<RenderingElement />);
    expect(tree.root.findAllByProps({children: 'AppInputText'}).length).toEqual(
      0,
    );
    expect(tree.root.findAllByProps({children: ''}).length).toEqual(0);
    expect(
      tree.root.findAllByProps({placeholder: 'placeholder'}),
    ).toBeDefined();
  });
  /**
   *
   */
  test('should update text on if change text', () => {
    const RenderingElement = () => {
      const {control} = useForm();
      return (
        <AppContextProvider>
          <AppInputText
            name="AppInputText"
            control={control}
            placeholder="placeholder"
          />
        </AppContextProvider>
      );
    };

    const tree = render(<RenderingElement />);
    const input = tree.getByPlaceholderText('placeholder');
    fireEvent.changeText(input, 'test change text');
    expect(input.props.value).toBe('test change text');
  });
  /**
   *
   */
});
