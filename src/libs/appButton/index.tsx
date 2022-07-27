import React, {useState} from 'react';
import {
  LayoutRectangle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable, AppTouchableProps} from '../appTouchable';
import {AppViewLoading} from '../appViewLoading';

type ContainerSizeType = Partial<LayoutRectangle>;
export interface AppButtonNormalProps extends Omit<AppTouchableProps, 'style'> {
  label: string | JSX.Element;
  textLabelStyle?: StyleProp<TextStyle>;
  loadingLabel?: React.ReactNode;
  containerStyle?: StyleProp<Omit<ViewStyle, 'opacity'>>;
  activeOpacity?: number;
  spinnerColor?: string;
  spinnerSize?: number;
  isLoading?: boolean;
}

export function AppButtonNormal({
  label,
  textLabelStyle,
  containerStyle,
  loadingLabel,
  spinnerColor,
  spinnerSize,
  disabled,
  isLoading,
  ...touchProps
}: AppButtonNormalProps) {
  const {Colors} = useAppContext();
  const [size, setSize] = useState<ContainerSizeType>();

  const _textLabelStyle = {
    color: (textLabelStyle as TextStyle)?.color || Colors.onPrimary,
    fontSize: (textLabelStyle as TextStyle)?.fontSize || Sizes.button,
  };

  const _containerStyle = {
    minWidth: size?.width,
    minHeight: size?.height,
    backgroundColor:
      (containerStyle as ViewStyle)?.backgroundColor || Colors.primary,
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        loadingLabel || (
          <AppViewLoading
            spinnerColor={spinnerColor || (_textLabelStyle.color as string)}
            spinnerSize={spinnerSize || _textLabelStyle.fontSize}
            containerStyle={[styles.loadingContainer, _containerStyle]}
          />
        )
      );
    }
    if (typeof label === 'string') {
      return (
        <Text style={[styles.textLabel, textLabelStyle, _textLabelStyle]}>
          {label}
        </Text>
      );
    }
    return label;
  };

  return (
    <AppTouchable
      onLayout={({nativeEvent}) => {
        const {layout} = nativeEvent;
        setSize({width: layout.width, height: layout.height});
      }}
      hitSlop
      disabled={isLoading || disabled}
      style={[styles.container, containerStyle, _containerStyle]}
      {...touchProps}>
      {renderContent()}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: Sizes.borderRadius,
    marginTop: Sizes.paddingLess,
  },
  textLabel: {
    marginVertical: Sizes.paddingLess,
    marginHorizontal: Sizes.padding * 2,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: Sizes.borderRadius,
  },
});
