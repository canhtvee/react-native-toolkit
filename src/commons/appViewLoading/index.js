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

  const _spinnerColor =
    spinnerColor ||
    Platform.select({
      ios: Colors.onBackground,
      android: Colors.primary,
    });
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
            ios: 'small',
            android: Sizes.h4,
          })
        }
        color={_spinnerColor}
      />
      {!!loadingText && (
        <Text style={[loadingTextStyle, {color: _spinnerColor}]}>
          {loadingText || 'Loading'}
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
