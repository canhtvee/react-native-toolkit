import {StyleProp, ViewStyle, TextStyle, TextInputProps} from 'react-native';

import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';

export interface ConfirmCodeInputProps
  extends Pick<ControllerRenderProps, 'value' | 'onChange'> {
  codeInputLength: number;
  codeLength: number;
  inputContainerStyle?: StyleProp<ViewStyle>;
  codeInputStyle?: StyleProp<TextStyle>;
  codeInputProps?: Omit<
    TextInputProps,
    'autoFocus' | 'secureTextEntry' | 'defaultValue'
  >;
  secureTextEntry?: boolean;
  onDone?: () => void;
}

export interface AppInputConfirmCodeProps
  extends UseControllerProps,
    Omit<ConfirmCodeInputProps, 'containerStyle' | 'onChange' | 'value'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export declare function ConfirmCodeInput(
  props: ConfirmCodeInputProps,
): JSX.Element;

export declare function AppInputConfirmCode(
  props: AppInputConfirmCodeProps,
): JSX.Element;
