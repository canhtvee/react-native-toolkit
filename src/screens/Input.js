import React from 'react';
import {TextInput} from 'react-native';
import {Sizes, useAppContext} from '../utils';

Input = React.forwardRef(Input);

export function Input({style, ...props}, ref) {
  const {Styles} = useAppContext();
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      console.log('imperativeHandle');
      inputRef.current.focus();
    },
  }));

  return (
    <TextInput
      ref={inputRef}
      {...props}
      style={[Styles.border, {padding: Sizes.padding}, style]}
    />
  );
}
