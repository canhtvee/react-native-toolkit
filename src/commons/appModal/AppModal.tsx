import React, {
  createRef,
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ModalProps,
  Modal,
  StyleProp,
  TextStyle,
  ViewStyle,
  View,
  StyleSheet,
} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import {Sizes, useAppContext} from '@utils';
import {AppIcon} from '../appIcon';
import {AppText} from '../appText';

export type ModalStateType = {
  config?: ModalProps;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  description?: string;
  descriptionStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  children?: JSX.Element;
  onHide?: () => void;
};

export type AppModalServiceType = {
  show: (data: ModalStateType) => void;
  hide: () => void;
};

const modalViewRef: RefObject<AppModalServiceType> = createRef();

const ModalView = forwardRef<AppModalServiceType, ModalStateType>(
  (props, ref) => {
    const {Colors} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const modalStateRef = useRef<ModalStateType | null>();
    const timeOutRef = useRef<NodeJS.Timer>();

    useImperativeHandle(ref, () => ({
      show: (data: ModalStateType) => {
        if (modalStateRef.current && modalStateRef.current !== data) {
          setIsOpen(false);
          timeOutRef.current && clearTimeout(timeOutRef.current);
          timeOutRef.current = setTimeout(() => {
            modalStateRef.current = data;
            setIsOpen(true);
          }, 300);
          return;
        }

        modalStateRef.current = data;
        setIsOpen(true);
      },

      hide: () => setIsOpen(false),
    }));

    useEffect(() => {
      if (isOpen) {
        return;
      }
      props?.onHide?.();
      modalStateRef.current = null;
    }, [isOpen]);

    useBackHandler(() => false);

    const _props = modalStateRef.current;

    return (
      <Modal
        animationType="fade"
        visible={isOpen}
        style={{position: 'absolute', flex: 1}}
        transparent={true}
        {..._props?.config}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.placeholder,
          }}>
          <AppIcon
            name={'closeCircle'}
            iconContainerStyle={{
              alignSelf: 'flex-end',
              padding: Sizes.paddinglxx,
            }}
            onPress={() => {
              setIsOpen(false);
            }}
          />
          {!!_props?.title && (
            <AppText style={[styles.title, _props?.titleStyle]}>
              {_props.title}
            </AppText>
          )}
          {!!_props?.description && (
            <AppText style={[styles.description, _props.descriptionStyle]}>
              {_props.description}
            </AppText>
          )}
          {_props?.children}
        </View>
      </Modal>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: Sizes.borderRadius * 1.5,
    paddingBottom: Sizes.width(40),
    width: Sizes.width(343),
    marginTop: Sizes.width(160),
    minHeight: Sizes.width(200),
  },
  title: {
    fontWeight: 'bold',
    marginHorizontal: Sizes.width(30),
    marginTop: Sizes.width(20),
    marginBottom: Sizes.width(30),
    textAlign: 'center',
  },
  description: {
    fontSize: Sizes.regular,
    marginHorizontal: Sizes.width(40),
    marginBottom: Sizes.width(40),
    textAlign: 'center',
  },
});

/**
 * Using an additional level of abstraction to make this module more compact and declarative
 */

export const AppModal = {
  View: ModalView,
  ref: modalViewRef,
  show: (data: ModalStateType) => modalViewRef.current?.show(data),
  hide: () => modalViewRef.current?.hide(),
};
