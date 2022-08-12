import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {AppTouchableProps} from '../appTouchable';
import {AppIconNames} from './AppIcon';

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
} from './Glyphs';

export type VectorIconNameType = {
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

export interface VectorIconProps {
  style?: StyleProp<TextStyle>; // vector-icons were built on top of text
  /**
   * The last icon name will be used to render vector icon
   */
  name: VectorIconNameType;
  size?: number;
  color?: ColorValue;
}

export type AppIconNamesType = keyof typeof AppIconNames;
export interface AppIconProps
  extends Omit<VectorIconProps, 'style' | 'name'>,
    Pick<
      AppTouchableProps,
      'onPress' | 'disabled' | 'hitSlop' | 'activeOpacity'
    > {
  iconStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  name: AppIconNamesType;
}

export declare function VectorIcon(props: VectorIconProps): JSX.Element;
export declare function AppIcon(props: AppIconProps): JSX.Element;
