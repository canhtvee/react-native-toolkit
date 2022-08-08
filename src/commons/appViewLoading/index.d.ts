import {StyleProp, ViewStyle, TextStyle} from 'react-native';

export interface AppViewLoadingProps {
  loadingText?: string;
  loadingTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  spinnerColor?: string;
  spinnerSize?: number;
}

export declare function AppViewLoading(props: AppViewLoadingProps): JSX.Element;
