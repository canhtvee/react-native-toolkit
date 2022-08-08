import {UseControllerProps} from 'react-hook-form';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {AppTouchableProps} from '../appTouchable';

export type RadioDataItem = {
  id: number | string;
  label: string;
};

export interface RadioInputFlexProps
  extends Pick<AppTouchableProps, 'activeOpacity' | 'activeBackgroundColor'> {
  data: Array<RadioDataItem>;
  value: number;
  onValueChange: (id: number | string) => void;
  itemStyle?: StyleProp<ViewStyle>;
  radioContainerStyle?: StyleProp<ViewStyle>;
  radioLabelStyle?: StyleProp<TextStyle>;
  unselectedRadioStyle?: StyleProp<ViewStyle>;
  selectedRadioStyle?: StyleProp<ViewStyle>;
}

export interface RadiosProps {
  data: Array<RadioDataItem>;
  value: number;
  onValueChange: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;

  /**
   * Do not use margin props for alignment of item, use itemMargin instead
   */
  itemStyle?: StyleProp<
    Omit<ViewStyle, 'marginRight' | 'marginBottom' | 'marginLeft' | 'marginTop'>
  >;

  /**
   * use itemMargin prop to align item in both vertical and horizontal directions
   */
  itemMargin?: number;

  unselectedRadioStyle?: StyleProp<ViewStyle>;
  selectedRadioStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

export interface AppInputRadiosProps
  extends Omit<RadiosProps, 'value' | 'onValueChange' | 'containerStyle'>,
    UseControllerProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  radiosContainerStyle?: StyleProp<ViewStyle>;
}
