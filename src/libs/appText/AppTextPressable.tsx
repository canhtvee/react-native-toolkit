import React from 'react';
import {
  Pressable,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  Omit,
  PressableProps,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

export interface AppTextPressableProps extends Pick<PressableProps, 'onPress'> {
  /**
   * do not set backgroundColor prop of textStyle, use backgroundColor and activeBackgroundColor prop instead
   */
  textStyle?: StyleProp<Omit<TextStyle, 'backgroundColor'>>;

  /**
   * do not set backgroundColor prop of containerStyle, use backgroundColor and activeBackgroundColor prop instead
   */
  containerStyle?: StyleProp<Omit<ViewStyle, 'backgroundColor'>>;

  children?: React.ReactNode;

  /**
   * backgroundColor in normal state
   */
  backgroundColor?: string;

  /**
   * backgoundColor if pressed
   */
  activeBackgroundColor?: string;
}

export function AppTextPressable({
  children,
  textStyle,
  containerStyle,
  backgroundColor,
  activeBackgroundColor,
  onPress,
}: AppTextPressableProps) {
  const {Colors} = useAppContext();

  const _backgroundColor = backgroundColor || Colors.background;
  const _activeBackgroundColor = activeBackgroundColor || Colors.ripple;

  const _borderRadius =
    (containerStyle as ViewStyle)?.borderRadius || Sizes.borderRadius1 * 0.8;

  return (
    <Pressable
      style={({pressed}) => [
        {
          paddingVertical: Sizes.paddingLess1,
          paddingHorizontal: Sizes.paddingLess1,
        },
        containerStyle,

        {
          borderRadius: _borderRadius,
          backgroundColor:
            onPress && pressed ? _activeBackgroundColor : _backgroundColor,
        },
      ]}>
      <Text
        style={[
          {fontSize: Sizes.button, color: Colors.primaryDark},
          textStyle,
        ]}>
        {children}
      </Text>
    </Pressable>
  );
}
