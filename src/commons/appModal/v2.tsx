import React, {useEffect, useRef, useState} from 'react';
import {ModalProps, Modal, View} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {useAppContext} from '../../utils';

export type ModalStateType = {
  config?: ModalProps;
  children?: JSX.Element;
};

type ModalRefType = {
  onOpenModal?: (props: ModalStateType) => void;
  onCloseModal?: () => void;
};

function AppModalContentContainer({
  onUnmount,
  children,
}: {
  onUnmount?: () => void;
  children?: JSX.Element;
}) {
  const {Colors} = useAppContext();

  useEffect(() => {
    return onUnmount;
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.placeholder,
      }}>
      {children}
    </View>
  );
}

const modalRef: {current?: ModalRefType} = {
  current: undefined,
};

function ModalView() {
  const [isOpen, setIsOpen] = useState(false);
  const modalStateRef = useRef<ModalStateType>();

  useEffect(() => {
    modalRef.current = {
      onOpenModal: (props: ModalStateType) => {
        modalStateRef.current = props;
        setIsOpen(true);
      },
      onCloseModal: () => setIsOpen(false),
    };
    return () => {
      modalRef.current = undefined;
    };
  }, []);

  useBackHandler(() => false);

  return (
    <Modal
      // onDismiss={() => (modalStateRef.current = undefined)}
      animationType="fade"
      visible={isOpen}
      style={{position: 'absolute', flex: 1}}
      transparent={true}
      {...modalStateRef.current?.config}>
      <AppModalContentContainer
        onUnmount={() => (modalStateRef.current = undefined)}>
        {modalStateRef.current?.children}
      </AppModalContentContainer>
    </Modal>
  );
}

export const AppModal = {
  View: ModalView,
  openModal: (props: ModalStateType) =>
    modalRef.current?.onOpenModal && modalRef.current?.onOpenModal(props),
  closeModal: () =>
    modalRef.current?.onCloseModal && modalRef.current?.onCloseModal(),
};
