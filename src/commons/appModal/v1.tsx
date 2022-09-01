import React, {useEffect, useRef, useState} from 'react';
import {ModalProps, Modal, View} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {useAppContext} from '../../utils';

export type ModalEventDataType = {
  config?: ModalProps;
  children?: JSX.Element;
};

export type ModalEventNameType = 'requestOpenModal' | 'requestCloseModal';

export type ModalEventType = {
  eventName: ModalEventNameType;
  data: ModalEventDataType;
};

export type ModalEventListenerType = (event: ModalEventType) => void;

const appModalContext = {
  listeners: new Array<ModalEventListenerType>(0),
};

export const AppModalService = {
  addListener: (cb: ModalEventListenerType) => {
    appModalContext.listeners.push(cb);
    const subscription = {
      removeListener: () => {
        const _listenters = appModalContext.listeners.filter(_l => _l !== cb);
        appModalContext.listeners = _listenters;
      },
    };
    return subscription;
  },

  onChange: (event: ModalEventType) => {
    appModalContext.listeners.forEach(_l => _l(event));
  },

  removeAllListeners: () => (appModalContext.listeners = []),
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

export function AppModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalStateRef = useRef<ModalEventDataType>();

  useEffect(() => {
    const subscription = AppModalService.addListener(event => {
      if (event.eventName === 'requestOpenModal') {
        modalStateRef.current = event.data;
        setIsOpen(true);
      } else if (event.eventName === 'requestCloseModal') {
        setIsOpen(false);
      }
    });

    return () => {
      subscription.removeListener();
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
