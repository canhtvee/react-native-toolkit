import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Modal,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

type SpinnerSizeType = number | 'small' | 'large' | undefined;

export interface AppViewLoadingProps {
  loadingText?: string;
  loadingTextStyle?: StyleProp<TextStyle>;
  spinnerColor?: string;
  spinnerSize?: SpinnerSizeType;
  overlay?: boolean;
  containerStyle: StyleProp<ViewStyle>;
}

export function AppViewLoading({
  loadingText,
  loadingTextStyle,
  containerStyle,
  spinnerColor,
  spinnerSize,
  overlay,
}: AppViewLoadingProps) {
  const {Colors} = useAppContext();

  const _spinner = (
    <ActivityIndicator
      size={
        spinnerSize ||
        Platform.select<SpinnerSizeType>({
          ios: 'small',
          android: Sizes.wpx(24),
        })
      }
      color={
        spinnerColor ||
        Platform.select({
          ios: Colors.onBackground,
          android: Colors.primary,
        })
      }
    />
  );

  const _loadingText = loadingText && (
    <Text style={loadingTextStyle}>{loadingText || 'Loading'}</Text>
  );

  if (overlay) {
    return (
      <Modal animationType="fade" visible={true} transparent={true}>
        <View
          style={[
            styles.ovelayContainer,
            {backgroundColor: Colors.hover},
            containerStyle,
          ]}>
          {_spinner}
          {_loadingText}
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
      {_spinner}
      {_loadingText}
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
});
