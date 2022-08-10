import {ImageProps, StyleProp, ViewStyle} from 'react-native';
import {FastImageProps, ImageStyle, Priority} from 'react-native-fast-image';
import {ResourceImageNameType} from '../../utils';

export interface AppImageLocalProps extends Omit<ImageProps, 'source'> {
  name: ResourceImageNameType;
}

export declare function AppImageLocal(props: AppImageLocalProps): JSX.Element;

export type AppImageRemoteSourceType = {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
  priority?: Priority;
  cache?: 'immutable' | 'web' | 'cacheOnly';
};

export interface AppImageRemoteProps
  extends Omit<FastImageProps, 'source' | 'onLoad' | 'onError' | 'style'> {
  source: AppImageRemoteSourceType;
  spinnerSize?: number;
  spinnerColor?: string;
  placeholder?: JSX.Element;
  isLoading?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  onSuccess?: () => void;
  onError?: () => void;
}

export declare function AppImageRemote(props: AppImageRemoteProps): JSX.Element;
