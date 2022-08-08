import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppViewLoading({
  loadingText,
  loadingTextStyle,
  containerStyle,
  spinnerColor,
  spinnerSize,
}) {
  const {Colors} = useAppContext();

  const _spinnerColor = spinnerColor || Colors.onBackground;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: Colors.background},
        containerStyle,
      ]}>
      <ActivityIndicator
        size={
          spinnerSize ||
          Platform.select({
            ios: Sizes.button,
            android: Sizes.h4,
          })
        }
        color={_spinnerColor}
      />
      {!!loadingText && (
        <Text style={[loadingTextStyle, {color: _spinnerColor}]}>
          {loadingText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
