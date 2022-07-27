/**
 * To define types related to AppBottomSheetModal usage
 */

import {BottomSheetModalProps} from '@gorhom/bottom-sheet';

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
