import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import KeyboardAwareBaseIOS from './KeyboardAwareBase.ios';
import {Sizes} from '../../utils';

/**
 * @description: A wrapper component which handles the ScrollView insets properly when the keyboard is shown and hides the content, scrolling content above the keybaord.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/KeyboardAwareScrollViewScreen.js
 */

/**
 *
 * If using Input with multiline enabled, scrollable should be disabled and maxHeight of input has to be specified
 */
export default class KeyboardAwareScrollViewIOS extends KeyboardAwareBaseIOS {
  static displayName = 'KeyboardAwareScrollView';

  static PropTypes = {
    getTextInputRefs: PropTypes.func,
    onScroll: PropTypes.func,
  };

  static defaultProps = {
    ...KeyboardAwareBaseIOS.defaultProps,
    getTextInputRefs: () => {
      return [];
    },
  };

  render() {
    return (
      <ScrollView
        scrollEventThrottle={200}
        {...this.props}
        {...this.style}
        contentInset={{
          bottom: this.state.keyboardHeight - 80,
        }}
        ref={r => {
          this._keyboardAwareView = r;
        }}
        onLayout={this._onKeyboardAwareViewLayout}
        onScroll={this._onKeyboardAwareViewScroll}
        onContentSizeChange={this._updateKeyboardAwareViewContentSize}
        snapToEnd={false}
        contentContainerStyle={{paddingVertical: Sizes.padding}}
      />
    );
  }
}
