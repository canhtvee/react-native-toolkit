import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {View, StyleProp, ViewStyle, TextStyle, Text} from 'react-native';
import Spinner from 'react-native-spinkit';

export interface AppViewLoadingProps {
  loadingText?: string;
  loadingTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  spinnerColor?: string;
  spinnerSize?: number;
}

export function AppViewLoading({
  loadingText,
  loadingTextStyle,
  containerStyle,
  spinnerColor,
  spinnerSize,
}: AppViewLoadingProps) {
  const _spinnerSize = spinnerSize || 24;
  const _padding = Platform.select({
    ios: {
      paddingRight: _spinnerSize * 0.25,
      paddingBottom: _spinnerSize * 0.25,
    },
    android: undefined,
  });
  return (
    <View style={[styles.container, containerStyle, _padding]}>
      <Spinner type={'Circle'} size={_spinnerSize} color={spinnerColor} />
      {!!loadingText && <Text style={loadingTextStyle}>{loadingText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
