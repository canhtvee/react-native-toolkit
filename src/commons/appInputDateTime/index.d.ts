import {StyleProp, ViewStyle, TextStyle, ColorValue} from 'react-native';
import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';
import {DatePickerProps} from 'react-native-date-picker';

export interface DateInputProps
  extends Omit<DatePickerProps, 'style' | 'date'>,
    Pick<ControllerRenderProps, 'onChange' | 'value'> {
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderColor?: string | ColorValue;
  rightChild?: JSX.Element;
}

export interface AppInputDateProps extends UseControllerProps, DateInputProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rightChild?: JSX.Element;
}

export declare function DateInput(props: DateInputProps): JSX.Element;
export declare function AppInputDate(props: AppInputDateProps): JSX.Element;
