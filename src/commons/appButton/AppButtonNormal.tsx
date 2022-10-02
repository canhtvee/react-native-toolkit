import React, {useRef} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '@utils';

import {AppTouchable, AppTouchableProps} from '../appTouchable';

export interface AppButtonNormalProps
  extends Omit<AppTouchableProps, 'style' | 'onPress'> {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;

  /**
   * Icon in every positions maybe icon or image
   */
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  iconTop?: JSX.Element;
  iconBottom?: JSX.Element;

  containerStyle?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  spinnerSize?: number | 'small' | 'large' | undefined;
  /**
   * To show loading state
   */
  isLoading?: boolean;
  /**
   * To wrap onPress to support immediately ui blocking
   */
  useBlockUi?: boolean;
  onPress?: (() => Promise<void>) | (() => void);

  /**
   * To specify a rich ui label
   */
  label?: JSX.Element;
  loadingLabel?: JSX.Element;
  /**
   * To specify solid button type
   */
  primaryButton?: boolean;
  /**
   * To specify text button type
   */
  textButton?: boolean;
  /**
   * To specify bordered button type
   */
  borderedButton?: boolean;
}

export function AppButtonNormal({
  title,
  titleStyle,
  iconLeft,
  iconRight,
  iconTop,
  iconBottom,
  containerStyle,
  spinnerSize,
  label,
  loadingLabel,
  isLoading,
  disabled,
  hitSlop = true,
  onPress,
  useBlockUi,
  primaryButton,
  textButton,
  borderedButton,
  ...touchProps
}: AppButtonNormalProps) {
  const {Colors} = useAppContext();
  const comRef = useRef({isHandlingPress: false});

  const _titleStyle = StyleSheet.flatten([
    primaryButton && {color: Colors.onPrimary},
    (borderedButton || textButton) && {color: Colors.primary},
    titleStyle,
  ]);

  let _contentElement;
  if (isLoading) {
    _contentElement = loadingLabel || (
      <ActivityIndicator color={_titleStyle.color} size={spinnerSize} />
    );
  } else {
    _contentElement = (
      <>
        {iconTop}
        {iconLeft}
        <Text style={[{fontSize: Sizes.button}, _titleStyle]}>{title}</Text>
        {iconBottom}
        {iconRight}
        {label}
      </>
    );
  }

  // To block press event immediately if make api request
  let _onPress = null;
  if (typeof onPress === 'function') {
    _onPress = !useBlockUi
      ? onPress
      : async () => {
          if (comRef.current.isHandlingPress) {
            return;
          }
          comRef.current.isHandlingPress = true;
          await (onPress && onPress());
          comRef.current.isHandlingPress = false;
        };
  }

  return (
    <AppTouchable
      hitSlop={hitSlop}
      disabled={disabled || isLoading}
      style={[
        primaryButton && [
          styles.primaryButton,
          {backgroundColor: Colors.primary},
        ],
        textButton && [
          styles.textButton,
          {backgroundColor: Colors.background, borderColor: Colors.primary},
        ],
        borderedButton && [
          styles.borderedButton,
          {backgroundColor: Colors.background, borderColor: Colors.primary},
        ],
        {
          flexDirection: iconLeft || iconRight ? 'row' : 'column',
        },
        containerStyle,
      ]}
      onPress={_onPress}
      {...touchProps}>
      {_contentElement}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Sizes.wpx(40),
    paddingHorizontal: Sizes.padding * 2,
    borderRadius: Sizes.borderRadius,
  },

  borderedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Sizes.wpx(40),
    paddingHorizontal: Sizes.padding * 2,
    borderRadius: Sizes.borderRadius,
    borderWidth: Sizes.borderWidth,
  },
  textButton: {
    borderBottomWidth: Sizes.borderWidth,
  },
});
