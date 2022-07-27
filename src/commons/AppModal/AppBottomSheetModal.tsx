import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {useBackHandler, useKeyboard} from '@react-native-community/hooks';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import {useAppContext, useRerender} from '../../utils';

import {
  AppBottomSheetModalContextType,
  AppBottomSheetModalProps,
} from './types';

/**
 * To expose only onOpenModal and onCloseModal methods to other components
 */
let modalContext: AppBottomSheetModalContextType = {
  onOpenModal: (_: AppBottomSheetModalProps) => null,
  onCloseModal: () => null,
};

export function useAppBottomSheetModal() {
  return modalContext;
}

/**
 * To use ContentContainer umount effect to update modalContext everytime modal closed
 * in cases of onPress on backdrop or back navigation event
 */
function AppBottomSheetModalContentContainer({
  children,
  onUnmount,
}: {
  children?: JSX.Element | null;
  onUnmount: () => void;
}) {
  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);
  return <View style={{flex: 1}}>{children}</View>;
}

export function AppBottomSheetModal() {
  const {Styles} = useAppContext();
  const rerender = useRerender();
  const modalRef = useRef<BottomSheetModalMethods>(null);
  const modalStateRef = useRef<AppBottomSheetModalProps>({
    isOpen: false,
    config: {},
    children: null,
  });
  const keyboard = useKeyboard();

  const resetModalState = () => {
    modalStateRef.current = {isOpen: false, config: {}, children: null};
    console.log('modalState', modalStateRef.current);
  };

  useEffect(() => {
    const onOpenModal = (props: AppBottomSheetModalProps) => {
      modalStateRef.current = {
        ...modalStateRef.current,
        ...props,
        isOpen: true,
      };
      console.log('modalState', modalStateRef.current);
      rerender();
      modalRef?.current?.present();
    };

    const onCloseModal = () => {
      modalRef?.current?.dismiss();
    };

    modalContext = {onOpenModal, onCloseModal};

    return () => {
      modalContext = {
        onOpenModal: (_: AppBottomSheetModalProps) => null,
        onCloseModal: () => null,
      };
    };
  }, []);

  // Handler backnavigation
  useBackHandler(() => {
    if (modalStateRef.current.isOpen) {
      modalRef?.current?.dismiss();
      return true;
    }
    return false;
  });

  // Handle onKeyboardShown
  if (keyboard.keyboardShown && modalRef?.current) {
    modalRef.current.snapToIndex(1);
  }

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      handleIndicatorStyle={{
        height: 0,
      }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      snapPoints={['60%', '80%']}
      enableOverDrag={false}
      style={[
        Styles.shadow,
        {
          borderRadius: 8,
          paddingTop: 0,
        },
      ]}
      {...modalStateRef.current.config}>
      <AppBottomSheetModalContentContainer onUnmount={resetModalState}>
        {modalStateRef.current.children}
      </AppBottomSheetModalContentContainer>
    </BottomSheetModal>
  );
}
