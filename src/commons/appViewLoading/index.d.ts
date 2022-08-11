import {StyleProp, TextStyle} from 'react-native';

export interface AppViewLoadingProps {
  loadingText?: string;
  loadingTextStyle?: StyleProp<TextStyle>;
  spinnerColor?: string;
  spinnerSize?: number;
  overlay?: boolean;
}

export declare function AppViewLoading(props: AppViewLoadingProps): JSX.Element;
