import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  LayoutRectangle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {CommonStyles, Sizes, useAppContext} from '@utils';

import {AppTouchable, AppTouchableProps} from '../appTouchable';

type ContainerSizeType = Partial<LayoutRectangle>;
export interface AppButtonNormalProps extends Omit<AppTouchableProps, 'style'> {
  label: string | JSX.Element;
  textLabelStyle?: StyleProp<TextStyle>;
  loadingLabel?: JSX.Element;
  containerStyle?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  spinnerSize?: number;
  isLoading?: boolean;
}

export function AppButtonNormal({
  label,
  textLabelStyle,
  containerStyle,
  loadingLabel,
  spinnerSize,
  disabled,
  isLoading,
  hitSlop = true,
  ...touchProps
}: AppButtonNormalProps) {
  const {Colors} = useAppContext();
  const [size, setSize] = useState<ContainerSizeType>();
  const {current: btnRef} = useRef({init: true});

  const _textStyle = StyleSheet.flatten(textLabelStyle || []);
  if (!_textStyle?.color) {
    _textStyle.color = Colors.onPrimary;
  }

  let _contentElement;

  if (isLoading) {
    _contentElement = loadingLabel || (
      <ActivityIndicator color={_textStyle.color} size={spinnerSize} />
    );
  } else if (typeof label === 'string') {
    _contentElement = (
      <Text style={[{fontSize: Sizes.button}, _textStyle]}>{label}</Text>
    );
  } else if (React.isValidElement(label)) {
    _contentElement = label;
  } else {
    _contentElement = null;
  }

  return (
    <AppTouchable
      onLayout={({nativeEvent}) => {
        if (btnRef.init) {
          setSize({
            width: nativeEvent.layout.width,
            height: nativeEvent.layout.height,
          });
          btnRef.init = false;
        }
      }}
      hitSlop={hitSlop}
      disabled={disabled || isLoading}
      style={[
        CommonStyles.solidButtonContainer,
        {backgroundColor: Colors.primary},
        containerStyle,
        {width: size?.width, height: size?.height},
      ]}
      {...touchProps}>
      {_contentElement}
    </AppTouchable>
  );
}
