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

import {Sizes} from '../../utils';

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
  name: IconNameType;
  size?: number;
  color?: ColorValue;
}

export function Icon({name, color, size = Sizes.icon, style}: IconProps) {
  const type = Object.keys(name).pop();

  switch (type as IconType) {
    case 'antDesign':
      return (
        <AntDesign
          name={name.antDesign!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'fontAwesome':
      return (
        <FontAwesome
          name={name.fontAwesome!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'fontAwesome5':
      return (
        <FontAwesome5
          name={name.fontAwesome5!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'materialIcons':
      return (
        <MaterialIcons
          name={name.materialIcons!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'materialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name.materialCommunityIcons!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'feather':
      return (
        <Feather name={name.feather!} color={color} size={size} style={style} />
      );

    case 'fontisto':
      return (
        <Fontisto
          name={name.fontisto!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'evilIcons':
      return (
        <EvilIcons
          name={name.evilIcons!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'entypo':
      return (
        <Entypo name={name.entypo!} color={color} size={size} style={style} />
      );

    case 'octicons':
      return (
        <Octicons
          name={name.octicons!}
          color={color}
          size={size}
          style={style}
        />
      );

    case 'ionicons':
      return (
        <Ionicons
          name={name.ionicons!}
          color={color}
          size={size}
          style={style}
        />
      );

    default:
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
