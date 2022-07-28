import React from 'react';
import {Text} from 'react-native';
import {launchCamera} from 'react-native-image-picker';

import {FetchApi, Sizes, useAppContext} from '../../../utils';
import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

import {ImageInputSourceProps} from './types';

export function ImageInputSourceCamera({
  onCloseImagePicker,
  setImageResource,
}: ImageInputSourceProps) {
  const {Colors, Strings} = useAppContext();

  const onPress = async () => {
    onCloseImagePicker();
    try {
      const {assets} = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('onPressLanchCamera', assets);
      if (assets && assets.length) {
        setImageResource({status: 'loading'});
        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });
        console.log('resultUpload', resultUpload);
        setImageResource({
          status: 'loading',
          data: {...assets[0], imageToServer: resultUpload?.data},
        });
      }
    } catch (error) {
      console.log('error', error);
      setImageResource({status: 'error'});
    }
  };

  return (
    <AppTouchable
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Sizes.borderRadius,
        borderWidth: Sizes.borderWidth,
        borderColor: Colors.border,
        padding: Sizes.padding,
        minWidth: Sizes.width(25),
      }}>
      <AppIcon name={{feather: 'camera'}} color={Colors.icon} size={Sizes.h4} />
      <Text
        style={{
          color: Colors.icon,
          fontSize: Sizes.regular,
        }}>
        {Strings.Camera}
      </Text>
    </AppTouchable>
  );
}
