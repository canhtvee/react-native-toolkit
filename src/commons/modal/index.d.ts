import {StyleProp, TextStyle} from 'react-native';
import {BottomSheetModalProps} from '@gorhom/bottom-sheet';

/**
 * To define types related to AppBottomSheetModal usage
 */

export interface AppBottomSheetModalConfigProps
  extends Partial<Omit<BottomSheetModalProps, 'children'>> {}

export interface AppBottomSheetModalProps {
  isOpen?: boolean;
  config?: AppBottomSheetModalConfigProps;
  children?: JSX.Element | null;
}

export type AppBottomSheetModalContextType = {
  onOpenModal?: (props: AppBottomSheetModalProps) => void;
  onCloseModal?: () => void;
};

export declare function AppBottomSheetModal(): JSX.Element;

/**
 *
 */
export interface AppBottomSheetModalTopBarProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  showIcon?: boolean;
}

export declare function AppBottomSheetModalTopBar(
  props: AppBottomSheetModalTopBarProps,
): JSX.Element;
