import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Modal, ModalProps, View} from 'react-native';
import {useAppContext} from '../../utils';

type ModalStateType = {
  config?: ModalProps;
  children?: JSX.Element;
};

type ModalServiceType = {
  onOpenModal?: (props: ModalStateType) => void;
  onCloseModal?: () => void;
};

export const AppModalSerivce: ModalServiceType = {};

export function AppModal() {
  const {Colors} = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const modalState = useRef<ModalStateType>({});

  const onOpenModal = useCallback(
    (props: ModalStateType) => {
      modalState.current = props;
      setIsOpen(true);
    },
    [setIsOpen, modalState],
  );
  const onCloseModal = useCallback(() => {
    modalState.current = {};
    setIsOpen(false);
  }, [setIsOpen, modalState]);

  if (AppModalSerivce?.onCloseModal !== onOpenModal) {
    AppModalSerivce.onOpenModal = onOpenModal;
    AppModalSerivce.onCloseModal = onCloseModal;
  }

  useEffect(() => {
    return () => {
      AppModalSerivce.onCloseModal = undefined;
      AppModalSerivce.onOpenModal = undefined;
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      style={{position: 'absolute', flex: 1}}
      transparent={true}
      {...modalState.current?.config}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: Colors.placeholder,
        }}>
        {modalState.current?.children}
      </View>
    </Modal>
  );
}
