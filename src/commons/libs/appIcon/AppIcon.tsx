import React from 'react';
import {ColorValue} from 'react-native';
import {Omit, StyleProp, TextStyle, ViewStyle} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {Sizes} from '../../../utils';

import {AppTouchable, AppTouchableProps} from '../appTouchable';

import {
  AntDesignGlyphs,
  EntypoGlyphs,
  EvilIconsGlyphs,
  FeatherGlyphs,
  FontAwesome5Glyphs,
  FontAwesomeGlyphs,
  FontistoGlyphs,
  IoniconsGlyphs,
  MaterialCommunityIconsGlyphs,
  MaterialIconsGlyphs,
  OcticonsGlyphs,
} from './types';

type IconNameType = {
  antDesign?: AntDesignGlyphs;
  fontAwesome?: FontAwesomeGlyphs;
  feather?: FeatherGlyphs;
  ionicons?: IoniconsGlyphs;
  materialIcons?: MaterialIconsGlyphs;
  materialCommunityIcons?: MaterialCommunityIconsGlyphs;
  entypo?: EntypoGlyphs;
  evilIcons?: EvilIconsGlyphs;
  fontAwesome5?: FontAwesome5Glyphs;
  octicons?: OcticonsGlyphs;
  fontisto?: FontistoGlyphs;
};

type IconType = keyof IconNameType;

export interface IconProps {
  style?: StyleProp<TextStyle>; // vector-icons were built on top of text

  /**
   * The last icon name will be used to render vector icon
   */
  name: IconNameType;
  size?: number;
  color?: ColorValue;
}

export function Icon({name, color, size, style}: IconProps) {
  const _type = Object.keys(name).pop();
  const _name = Object.values(name).pop();

  const _props = {
    name: _name!,
    color,
    style,
    size: size || Sizes.icon,
  };

  switch (_type as IconType) {
    case 'antDesign':
      return <AntDesign {..._props} />;
    case 'fontAwesome':
      return <FontAwesome {..._props} />;
    case 'fontAwesome5':
      return <FontAwesome5 {..._props} />;
    case 'materialIcons':
      return <MaterialIcons {..._props} />;
    case 'materialCommunityIcons':
      return <MaterialCommunityIcons {..._props} />;
    case 'feather':
      return <Feather {..._props} />;
    case 'fontisto':
      return <Fontisto {..._props} />;
    case 'evilIcons':
      return <EvilIcons {..._props} />;
    case 'entypo':
      return <Entypo {..._props} />;
    case 'octicons':
      return <Octicons {..._props} />;
    case 'ionicons':
      return <Ionicons {..._props} />;
    default:
      if (__DEV__) {
        throw new Error('Please specify a correct icon name');
      }
      return null;
  }
}

export interface AppIconProps
  extends Omit<IconProps, 'style'>,
    Omit<AppTouchableProps, 'style'> {
  iconStyle?: StyleProp<TextStyle>;
  touchStyle?: StyleProp<ViewStyle>;
}

export function AppIcon({
  iconStyle,
  touchStyle,
  onPress,
  activeOpacity,
  hitSlop,
  ...iconProps
}: AppIconProps) {
  if (onPress || touchStyle) {
    return (
      <AppTouchable
        hitSlop={hitSlop}
        style={touchStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}>
        <Icon style={iconStyle} {...iconProps} />
      </AppTouchable>
    );
  }

  return <Icon style={iconStyle} {...iconProps} />;
}
