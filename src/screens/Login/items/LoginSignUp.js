import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useKeyboard} from '@react-native-community/hooks';

import {AppText, AppTouchable} from '../../../libs';
import {
  ComonStyle,
  Sizes,
  TestIDs,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

export function LoginSignUp() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const keyboard = useKeyboard();

  const onPress = () => {
    navigation.navigate('SignUp');
  };
  if (keyboard.keyboardShown && keyboard.keyboardHeight) {
    return null;
  }
  return (
    <AppTouchable
      testID={TestIDs.Login_button_sign_up}
      onPress={onPress}
      hitSlop={{
        top: Sizes.padding,
        bottom: Sizes.padding,
        left: Sizes.padding,
        right: Sizes.padding,
      }}
      style={{
        position: 'absolute',
        flexDirection: 'row',
        bottom: Math.max(Sizes.padding, inset.bottom),
        alignSelf: 'center',
      }}>
      <AppText style={{fontSize: Sizes.h5}}>
        {Strings.Dont_have_an_account}{' '}
      </AppText>
      <View
        style={[
          ComonStyle.borderBottom(Colors.text),
          {
            borderBottomWidth: 1,
          },
        ]}>
        <AppText style={{fontSize: Sizes.h5}}>{Strings.Sign_up}</AppText>
      </View>
    </AppTouchable>
  );
}
