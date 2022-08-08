import {UseControllerProps} from 'react-hook-form';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {PhoneInputProps} from 'react-native-phone-number-input';

export interface ClearablePhoneInputProps extends PhoneInputProps {
  showClearIcon?: boolean;
}

export declare function ClearablePhoneInput(
  props: ClearablePhoneInputProps,
): JSX.Element;

export interface AppInputPhoneProps
  extends UseControllerProps,
    Omit<ClearablePhoneInputProps, 'containerStyle' | 'defaultValue'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  phoneInputContainerStyle?: StyleProp<ViewStyle>;
}

export declare function AppInputPhone(props: AppInputPhoneProps): JSX.Element;
