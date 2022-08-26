import {UseControllerProps, UseFormReturn} from 'react-hook-form';
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

export interface ClearableTextInputProps
  extends Omit<TextInputProps, 'defaultValue'> {}

export interface AppInputTextProps
  extends UseControllerProps,
    Partial<Pick<UseFormReturn, 'setValue'>>,
    Omit<TextInputProps, 'style' | 'defaultValue'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
  showClearIcon?: boolean;
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
