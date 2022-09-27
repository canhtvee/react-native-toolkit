import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import {Image, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {getResourceImage, Sizes, useAppContext} from '@utils';

import {AppIcon} from '../../appIcon';
import {AppViewLoading} from '../../appViewLoading';

import {ImageAvatarSource} from './ImageAvatarSource';
import {Status} from '../modules';

export function AppInputImageAvatar({
  control,
  name,
  rules,
  imageContainerStyle,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({field: {onChange, value}}) => (
        <ImageInputAvatar
          value={value}
          onChange={onChange}
          imageContainerStyle={[{alignSelf: 'center'}, imageContainerStyle]}
        />
      )}
    />
  );
}

function ImageInputAvatar({onChange, value, imageContainerStyle}) {
  const {Styles, Colors} = useAppContext();
  const [imageResource, setImageResource] = useState(null);
  const imageSourceRef = useRef(null);

  console.log('imageResource', imageResource);
  console.log('value', value);

  useEffect(() => {
    if (imageResource?.status === Status.LOAD_SUCCESSFUL) {
      onChange(imageResource.data);
      return;
    }
    if (imageResource?.status === Status.LOAD_FAILED) {
      onChange();
    }
  }, [imageResource]);

  console.log('imageResource', imageResource);

  return (
    <View style={imageContainerStyle}>
      <FastImage
        source={imageResource?.data}
        onLoad={() =>
          setImageResource(prev => ({
            ...prev,
            status: Status.LOAD_SUCCESSFUL,
          }))
        }
        onError={() =>
          setImageResource(prev => ({
            ...prev,
            status: Status.LOAD_FAILED,
          }))
        }
        style={[
          Styles.circle(20),
          {borderWidth: Sizes.borderWidth, borderColor: Colors.border},
        ]}>
        {!imageResource?.data && (
          <Image
            source={getResourceImage('default_avatar')}
            style={Styles.circle(20)}
          />
        )}
      </FastImage>
      {(imageResource?.status === Status.UPLOADING ||
        imageResource?.status === Status.UPLOAD_SUCCESSUL) && (
        <AppViewLoading overlay loadingText="Uploading..." />
      )}
      <AppIcon
        size={20}
        name={'edit-avatar'}
        color={Colors.onBackground}
        iconContainerStyle={[
          Styles.circle(4),
          styles.editIcon,
          {
            backgroundColor: Colors.withAlpha(Colors.background, '38%'),
          },
        ]}
        onPress={() => imageSourceRef.current.openModal()}
      />

      <ImageAvatarSource
        setImageResource={setImageResource}
        ref={imageSourceRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    position: 'absolute',
    bottom: Sizes.width(2.4),
    right: Sizes.width(2.4),
  },
});
