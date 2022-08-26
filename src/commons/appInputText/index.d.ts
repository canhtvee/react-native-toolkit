export * from './ClearableTextInput';

import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
export interface ClearableTextInputProps
  extends Omit<
      TextInputProps,
      'style' | 'value' | 'onBlur' | 'ref' | 'onChange' | 'onChangeText'
    >,
    ControllerRenderProps {
  showClearIcon?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}
export interface AppInputTextProps
  extends UseControllerProps,
    Omit<ClearableTextInputProps, 'defaultValue'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
}
export interface AppInputFieldArrayProps extends AppInputTextProps {
  fieldArrayName: string;
  fieldArrayItemIndex: number;
  fieldArrayItemChildKey: string;
}

export declare function ClearableTextInput(
  props: ClearableTextInputProps,
): JSX.Element;

export declare function AppInputText(props: AppInputTextProps): JSX.Element;

export declare function AppInputFieldArray(
  props: AppInputFieldArrayProps,
): JSX.Element;
