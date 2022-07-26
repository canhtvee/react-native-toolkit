import React from 'react';
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
  const spinnerSizeRendering = spinnerSize || 24;
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          paddingRight: spinnerSizeRendering * 0.25,
          paddingBottom: spinnerSizeRendering * 0.25,
        },
        containerStyle,
      ]}>
      <Spinner
        type={'Circle'}
        size={spinnerSizeRendering}
        color={spinnerColor}
      />
      {!!loadingText && <Text style={loadingTextStyle}>{loadingText}</Text>}
    </View>
  );
}
