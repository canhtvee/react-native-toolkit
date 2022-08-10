import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';
import {FastImageProps, ImageStyle} from 'react-native-fast-image';

export interface ImageInputProps
  extends Omit<FastImageProps, 'style' | 'source'>,
    Pick<ControllerRenderProps, 'value' | 'onChange'> {
  inputContainerStyle?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  showClearIcon?: boolean;
}

export interface AppInputImageProps
  extends UseControllerProps,
    Omit<ImageInputProps, 'value' | 'onChange'> {
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export interface AppInputImageArrayProps
  extends UseControllerProps,
    Omit<ImageInputProps, 'value' | 'onChange'> {
  containerStyle?: StyleProp<ViewStyle>;
  fieldArrayName?: string;
  fieldArrayItemIndex?: string;
  fieldArrayItemChildKey?: string;
}

export declare function AppInputImageArray(props: any): JSX.Element;
