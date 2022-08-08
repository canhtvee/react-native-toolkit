import {Insets} from 'react-native';

import {PressableProps, StyleProp, ViewStyle} from 'react-native';

export interface AppTouchableProps
  extends Omit<PressableProps, 'style' | 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number | boolean;
  activeBackgroundColor?: string | boolean;
  hitSlop?: Insets | number | boolean;
}

export declare function AppTouchable(props: AppTouchableProps): JSX.Element;
