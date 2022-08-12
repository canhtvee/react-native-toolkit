import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';

export interface ImageInputAvatarProps
  extends Pick<ControllerRenderProps, 'value' | 'onChange'> {
  imageContainerStyle?: StyleProp<ViewStyle>;
}

export interface AppInputImageAvatarProps
  extends UseControllerProps,
    Omit<ImageInputAvatarProps, 'value' | 'onChange'> {
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export interface AppInputImageArrayProps
  extends UseControllerProps,
    Omit<ImageInputAvatarProps, 'value' | 'onChange'> {
  containerStyle?: StyleProp<ViewStyle>;
  fieldArrayName?: string;
  fieldArrayItemIndex?: string;
  fieldArrayItemChildKey?: string;
}

export declare function AppInputImageArray(props: any): JSX.Element;
export declare function AppInputImageAvatar(props: any): JSX.Element;
