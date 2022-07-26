import React from 'react';
import {Text} from 'react-native';

import {
  ComonStyle,
  Sizes,
  TestIDs,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

export function LoginHeading() {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  return (
    <Text
      testID={TestIDs.Login_heading_title}
      style={[
        ComonStyle.bold,
        {
          color: Colors.text,
          fontSize: Sizes.h1,
          textAlign: 'left',
          marginHorizontal: Sizes.padding * 2,
          marginTop: Sizes.height(15),
          marginBottom: Sizes.padding * 2,
        },
      ]}>
      {Strings.Login}
    </Text>
  );
}
