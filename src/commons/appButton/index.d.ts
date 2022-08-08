import {LayoutRectangle, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {AppTouchableProps} from '../appTouchable';

type ContainerSizeType = Partial<LayoutRectangle>;
export interface AppButtonNormalProps extends Omit<AppTouchableProps, 'style'> {
  label: string | JSX.Element;
  textLabelStyle?: StyleProp<TextStyle>;
  loadingLabel?: JSX.Element;
  containerStyle?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  spinnerColor?: string;
  spinnerSize?: number;
  isLoading?: boolean;
}

export declare function AppButtonNormal(
  props: AppButtonNormalProps,
): JSX.Element;
