import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useBackHandler, useKeyboard} from '@react-native-community/hooks';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

import {CommonStyles} from '../../utils';

/**
 * To use ContentContainer umount effect to update modalContext everytime modal closed
 * in cases of onPress on backdrop or back navigation event
 */

function BottomSheetModalContentContainer({
  onUnmount,
  children,
}: {
  onUnmount?: () => void;
  children?: JSX.Element;
}) {
  useEffect(() => {
    return onUnmount;
  }, []);

  return <View style={{flex: 1}}>{children}</View>;
}

export type BottomSheetModalStateType = {
  config?: BottomSheetModalProps;
  children?: JSX.Element;
};

type BottomSheetModalRefType = {
  onOpenModal?: (props: BottomSheetModalStateType) => void;
  onCloseModal?: () => void;
};
const bottomSheetModalRef: {current?: BottomSheetModalRefType} = {
  current: undefined,
};

function BottomSheetModalView() {
  const [, trigerRerender] = useState({});
  const modalRef = useRef<BottomSheetModal>(null);
  const modalStateRef = useRef<BottomSheetModalStateType>();
  const keyboard = useKeyboard();

  if (!bottomSheetModalRef.current) {
    bottomSheetModalRef.current = {
      onOpenModal: props => {
        modalStateRef.current = props;
        trigerRerender({});
        modalRef.current?.present();
      },
      onCloseModal: () => {
        modalRef.current?.dismiss();
      },
    };
  }

  useEffect(() => {
    return () => {
      bottomSheetModalRef.current = undefined;
    };
  }, []);

  // Handler backnavigation
  useBackHandler(() => {
    if (modalStateRef.current) {
      modalRef.current?.dismiss();
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
        CommonStyles.shadow,
        {
          borderRadius: 8,
          paddingTop: 0,
        },
      ]}
      {...modalStateRef.current?.config}>
      <BottomSheetModalContentContainer
        onUnmount={() => (modalStateRef.current = undefined)}>
        {modalStateRef.current?.children}
      </BottomSheetModalContentContainer>
    </BottomSheetModal>
  );
}

export const AppBottomSheetModal = {
  View: BottomSheetModalView,
  openModal: (props: BottomSheetModalStateType) =>
    bottomSheetModalRef.current?.onOpenModal &&
    bottomSheetModalRef.current.onOpenModal(props),
  closeModal: () =>
    bottomSheetModalRef.current?.onCloseModal &&
    bottomSheetModalRef.current.onCloseModal(),
};
