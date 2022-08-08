import {StyleProp, TextProps, ViewStyle} from 'react-native';
import {AppTouchableProps} from '../appTouchable';

export interface AppTextProps
  extends Omit<
    TextProps,
    'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'
  > {}

export declare function AppText(props: AppTextProps): JSX.Element;

export interface AppTextTouchableProps
  extends Pick<TextProps, 'children' | 'style'>,
    Pick<AppTouchableProps, 'hitSlop' | 'onPress'> {
  touchStyle?: StyleProp<ViewStyle>;
}
