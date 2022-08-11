import {StyleProp, ViewStyle} from 'react-native';
import {FastImageProps, ImageStyle, Source} from 'react-native-fast-image';

export type AppAsyncImageSourceType = Source | number;

export interface AppAsyncImageProps
  extends Omit<FastImageProps, 'source' | 'onLoad' | 'onError' | 'style'> {
  source: AppAsyncImageSourceType;
  spinnerSize?: number;
  spinnerColor?: string;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: JSX.Element;
  isLoading?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  onLoadStart?: () => void;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

export declare function AppAsyncImage(props: AppAsyncImageProps): JSX.Element;
