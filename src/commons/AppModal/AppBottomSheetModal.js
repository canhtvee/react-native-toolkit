import React, {useRef} from 'react';
import {View} from 'react-native';
import {useBackHandler, useKeyboard} from '@react-native-community/hooks';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';

import {
  ComonStyles,
  useAppContext,
  useRerender,
  useUnmountEffect,
} from '../../utils';

/**
 * To expose only onOpenModal and onCloseModal methods to other components
 */
const modalContext = {
  onOpenModal: undefined,
  onCloseModal: undefined,
};
export function useAppBottomSheetModal() {
  return modalContext;
}

/**
 *
 */
export function AppBottomSheetModal() {
  const {Styles} = useAppContext();
  const rerender = useRerender();
  const modalRef = useRef(null);
  const modalStateRef = useRef({
    isOpen: false,
    config: {},
    children: null,
  });
  const keyboard = useKeyboard();

  const _resetModalState = () => {
    modalStateRef.current = {isOpen: false, config: {}, children: null};
    console.log('modalState', modalStateRef.current);
  };

  // To init modal context
  if (modalContext.onOpenModal === undefined) {
    modalContext.onOpenModal = props => {
      modalStateRef.current = {
        ...modalStateRef.current,
        ...props,
        isOpen: true,
      };
      console.log('modalState', modalStateRef.current);
      rerender();
      modalRef?.current?.present();
    };

    modalContext.onCloseModal = () => {
      modalRef?.current?.dismiss();
    };
  }

  // To reset modal context if unmount

  useUnmountEffect(() => {
    modalContext.onOpenModal = undefined;
    modalContext.onCloseModal = undefined;
  });

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
      snapPoints={['90%']}
      enableOverDrag={false}
      style={[
        ComonStyles.shadow,
        {
          borderRadius: 8,
          paddingTop: 0,
        },
      ]}
      {...modalStateRef.current.config}>
      <AppBottomSheetModalContentContainer onUnmount={_resetModalState}>
        {modalStateRef.current.children}
      </AppBottomSheetModalContentContainer>
    </BottomSheetModal>
  );
}

/**
 * To use ContentContainer umount effect to update modalContext everytime modal closed
 * in cases of onPress on backdrop or back navigation event
 */
function AppBottomSheetModalContentContainer({children, onUnmount}) {
  useUnmountEffect(onUnmount);

  return <View style={{flex: 1}}>{children}</View>;
}
