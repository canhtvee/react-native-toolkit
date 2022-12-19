import React from 'react';
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
  onPress?: () => void;

  /**
   * To specify a rich ui label
   */
  label?: JSX.Element;
  children?: JSX.Element;
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
   * To specify secondary text button type
   */
  secondaryTextButton?: boolean;
  /**
   * To specify bordered button type
   */
  borderedButton?: boolean;

  /**
   * To specify maxWidth button
   */
  fullSize?: boolean;
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
  children,
  loadingLabel,
  isLoading,
  disabled,
  hitSlop = true,
  onPress,
  fullSize,
  primaryButton = true,
  textButton,
  borderedButton,
  secondaryTextButton,
  ...touchProps
}: AppButtonNormalProps) {
  const {Colors} = useAppContext();

  const _titleStyle = StyleSheet.flatten([
    styles.title,

    primaryButton && {color: Colors.onPrimary},

    (borderedButton || textButton) && {
      color: Colors.primary,
    },

    secondaryTextButton && {color: Colors.icon},

    titleStyle,
  ]) as TextStyle;

  let _contentElement;
  if (isLoading) {
    _contentElement = loadingLabel || (
      <ActivityIndicator
        color={_titleStyle?.color || Colors.onPrimary}
        size={spinnerSize}
      />
    );
  } else if (label) {
    _contentElement = label;
  } else {
    _contentElement = (
      <>
        {iconTop}
        {iconLeft}
        <Text style={_titleStyle}>{title}</Text>
        {iconBottom}
        {iconRight}
        {children}
      </>
    );
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

        (textButton || secondaryTextButton) && [
          styles.textButton,
          {backgroundColor: Colors.background},
        ],

        borderedButton && [
          styles.borderedButton,
          {backgroundColor: Colors.background, borderColor: Colors.primary},
        ],

        fullSize && styles.fullSize,

        {
          flexDirection: iconLeft || iconRight ? 'row' : 'column',
        },
        containerStyle,
      ]}
      onPress={onPress}
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

  fullSize: {
    alignSelf: 'center',
    width: Sizes.wpx(340),
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
  title: {fontSize: Sizes.button, fontWeight: '600'},
});
