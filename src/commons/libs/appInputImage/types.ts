import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ControllerRenderProps, UseControllerProps} from 'react-hook-form';
import {ImageStyle} from 'react-native-fast-image';

import {ResourceType} from '../../../utils';
import {AppImageRemoteProps} from '../appImage';

export type ImageResourceType = ResourceType<unknown>;
export interface ImageInputSourceProps {
  onCloseImagePicker: () => void;
  setImageResource: React.Dispatch<
    React.SetStateAction<ImageResourceType | undefined>
  >;
}

export interface ImageInputProps
  extends Omit<AppImageRemoteProps, 'style' | 'source'>,
    Pick<ControllerRenderProps, 'value' | 'onChange'>,
    Omit<
      ImageInputSourceProps,
      'onChooseImage' | 'setIsLoading' | 'onCloseImagePicker'
    > {
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
