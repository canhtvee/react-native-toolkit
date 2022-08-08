import React, {useRef, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet, Text} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';

export function AppButtonNormal({
  label,
  textLabelStyle,
  containerStyle,
  loadingLabel,
  spinnerColor,
  spinnerSize,
  disabled,
  isLoading,
  activeOpacity,
  activeBackgroundColor,
  ...touchProps
}) {
  const {Colors} = useAppContext();
  const [size, setSize] = useState(null);
  const btnRef = useRef({init: true});

  const _spinnerSize = Platform.select({
    ios: Sizes.button,
    android: Sizes.h5,
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        loadingLabel || (
          <ActivityIndicator
            color={spinnerColor || Colors.onPrimary}
            size={spinnerSize || _spinnerSize}
          />
        )
      );
    }
    if (typeof label === 'string') {
      return (
        <Text style={[{color: Colors.onPrimary}, textLabelStyle]}>{label}</Text>
      );
    }
    return label;
  };

  return (
    <AppTouchable
      onLayout={({nativeEvent}) => {
        if (btnRef.current.init) {
          const {layout} = nativeEvent;
          setSize({width: layout.width, height: layout.height});
          btnRef.current.init = false;
        }
      }}
      hitSlop
      activeOpacity={activeOpacity}
      activeBackgroundColor={activeBackgroundColor}
      disabled={isLoading || disabled}
      style={[
        styles.container,
        containerStyle,
        {width: size?.width, height: size?.height},
      ]}
      {...touchProps}>
      {renderContent()}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
