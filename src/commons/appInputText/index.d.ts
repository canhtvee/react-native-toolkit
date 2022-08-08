import {UseControllerProps} from 'react-hook-form';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface ClearableTextInputProps
  extends Omit<TextInputProps, 'defaultValue'> {
  showClearIcon?: boolean;
}

export interface AppInputTextProps
  extends UseControllerProps,
    Omit<ClearableTextInputProps, 'style'> {
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

export declare function AppInputText(props: AppInputTextProps): JSX.Element;

export declare function AppInputFieldArray(
  props: AppInputFieldArrayProps,
): JSX.Element;
