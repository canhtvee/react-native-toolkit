import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Modal,
} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppViewLoading({
  loadingText,
  loadingTextStyle,
  containerStyle,
  spinnerColor,
  spinnerSize,
  overlay,
}) {
  const {Colors} = useAppContext();

  const _spinnerColor =
    spinnerColor ||
    Platform.select({
      ios: Colors.onBackground,
      android: Colors.primary,
    });

  if (overlay) {
    return (
      <Modal animationType="fade" visible={true} transparent={true}>
        <View
          style={[
            styles.ovelayContainer,
            {backgroundColor: Colors.hover},
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
            <Text
              style={[
                styles.overlayText,
                loadingTextStyle,
                {color: _spinnerColor},
              ]}>
              {loadingText || 'Loading'}
            </Text>
          )}
        </View>
      </Modal>
    );
  }

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
  ovelayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  overlayText: {
    marginTop: Sizes.padding,
  },
});
