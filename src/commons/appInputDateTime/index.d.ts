import {StyleProp, ViewStyle, TextStyle} from 'react-native';
import {UseControllerProps} from 'react-hook-form';
import {DatePickerProps} from 'react-native-date-picker';

export interface PickerProps extends Omit<DatePickerProps, 'open'> {
  ref: (instance: any) => void;
}
export interface AppInputDateProps extends UseControllerProps, PickerProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  rightChild?: JSX.Element;
}

export declare function AppInputDate(props: AppInputDateProps): JSX.Element;
