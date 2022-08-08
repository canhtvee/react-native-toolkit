import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {UseControllerProps} from 'react-hook-form';

export interface TextInputWithEffectProps
  extends Omit<
    TextInputProps,
    'style' | 'defaultValue' | 'onChange' | 'onChangeText'
  > {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  debounce?: number;
  onChangeValue: (value?: string) => void;
  onDebounce?: () => void;
}

export interface AppSearchTextInputProps
  extends UseControllerProps,
    Omit<TextInputWithEffectProps, 'onChangeValue'> {}

export declare function TextInputWithEffect(
  props: TextInputWithEffectProps,
): JSX.Element;

export declare function AppSearchTextInput(
  props: AppSearchTextInputProps,
): JSX.Element;
