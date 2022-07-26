import React, {useRef, useState} from 'react';
import {StyleProp, Text, TextStyle, ViewStyle} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable, AppTouchableProps} from '../appTouchable';
import {AppViewLoading} from '../appViewLoading';

export interface AppButtonNormalProps extends Omit<AppTouchableProps, 'style'> {
  label: string | JSX.Element;
  textLabelStyle?: StyleProp<TextStyle>;
  loadingLabel?: React.ReactNode;
  containerStyle?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  activeOpacity?: number;
  spinnerColor?: string;
  spinnerSize?: number;
  isLoading?: boolean;
}

export function AppButtonNormal({
  label,
  textLabelStyle,
  containerStyle,
  loadingLabel,
  spinnerColor,
  spinnerSize,
  disabled,
  isLoading,
  ...touchProps
}: AppButtonNormalProps) {
  const {Colors} = useAppContext();
  const [size, setSize] = useState<{
    width?: number;
    height?: number;
  }>({width: undefined, height: undefined});
  const compRef = useRef({init: true});

  const textColorRendering =
    (textLabelStyle as TextStyle)?.color || Colors.text;
  const textSizeRendering =
    (textLabelStyle as TextStyle)?.fontSize || Sizes.regular;

  const renderContent = () => {
    if (isLoading) {
      return (
        loadingLabel || (
          <AppViewLoading
            spinnerColor={spinnerColor || (textColorRendering as string)}
            spinnerSize={spinnerSize || textSizeRendering}
          />
        )
      );
    }
    if (typeof label === 'string') {
      return (
        <Text
          style={[
            textLabelStyle,
            {color: textColorRendering, fontSize: textSizeRendering},
          ]}>
          {label}
        </Text>
      );
    }
    return label;
  };

  return (
    <AppTouchable
      onLayout={({nativeEvent}) => {
        const {layout} = nativeEvent;
        if (compRef.current.init) {
          compRef.current.init = false;
          setSize({width: layout.width, height: layout.height});
        }
      }}
      disabled={isLoading || disabled}
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          minWidth: size.width,
          minHeight: size.height,
          padding: Sizes.paddingLess,
          borderRadius: Sizes.borderRadius,
        },
        containerStyle,
      ]}
      {...touchProps}>
      {renderContent()}
    </AppTouchable>
  );
}
