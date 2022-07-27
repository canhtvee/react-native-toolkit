import React from 'react';
import {StyleSheet} from 'react-native';
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
  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          paddingRight: _spinnerSize * 0.25,
          paddingBottom: _spinnerSize * 0.25,
        },
      ]}>
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
