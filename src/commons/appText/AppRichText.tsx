import React from 'react';
import {
  Linking,
  StyleProp,
  TextProps,
  View,
  TextStyle,
  ViewStyle,
} from 'react-native';
import ParsedText, {ParsedTextProps} from 'react-native-parsed-text';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  RenderHTMLProps,
} from 'react-native-render-html';

import {Sizes, _isHTML} from '@utils';
import {AppText, AppTextProps} from './AppText';

export interface AppRichTextProps {
  text?: string;
  textProps?: AppTextProps;
  normalTextProps?: TextProps;
  parsedTextProps?: ParsedTextProps;
  htmlContainerStyle?: StyleProp<ViewStyle>;
  htmlProps?: RenderHTMLProps;
  style?: StyleProp<TextStyle>;
}

export function AppRichText({
  text,
  textProps,
  parsedTextProps,
  htmlContainerStyle,
  htmlProps,
}: AppRichTextProps) {
  if (!text) {
    return null;
  }

  let textElement;
  if (_isHTML(text)) {
    textElement = (
      <View style={htmlContainerStyle}>
        <RenderHTML
          contentWidth={Sizes.wpx(338)}
          source={{html: text}}
          customHTMLElementModels={{
            p: HTMLElementModel.fromCustomModel({
              tagName: 'p',
              contentModel: HTMLContentModel.mixed,
            }),
            ol: HTMLElementModel.fromCustomModel({
              tagName: 'ol',
              contentModel: HTMLContentModel.mixed,
            }),
            li: HTMLElementModel.fromCustomModel({
              tagName: 'li',
              contentModel: HTMLContentModel.mixed,
            }),
            font: HTMLElementModel.fromCustomModel({
              tagName: 'font',
              contentModel: HTMLContentModel.mixed,
              getUADerivedStyleFromAttributes({face, color, size}) {
                let style: any = {};
                if (face) {
                  style.fontFamily = face;
                }
                if (color) {
                  style.color = color;
                }
                if (size) {
                }
                return style;
              },
            }),
          }}
          {...htmlProps}
        />
      </View>
    );
  } else if (text.includes('http')) {
    textElement = (
      <ParsedText
        parse={[
          {
            type: 'url',
            style: {
              textDecorationLine: 'underline',
            },
            onPress: url => Linking.openURL(url),
          },
        ]}
        childrenProps={{allowFontScaling: false}}
        {...parsedTextProps}>
        {text}
      </ParsedText>
    );
  } else {
    textElement = <AppText {...textProps}>{text}</AppText>;
  }

  return textElement;
}
