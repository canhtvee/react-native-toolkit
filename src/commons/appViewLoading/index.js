import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {Sizes} from '../../utils';

export function AppViewLoading({
  loadingText,
  loadingTextStyle,
  containerStyle,
  spinnerColor,
  spinnerSize,
}) {
  const _spinnerSize = Platform.select({
    ios: Sizes.button,
    android: Sizes.h4,
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        size={spinnerSize || _spinnerSize}
        color={spinnerColor}
      />
      {!!loadingText && <Text style={loadingTextStyle}>{loadingText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
