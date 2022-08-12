import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Sizes, useAppContext} from '../../../utils';

import {AppIcon} from '../../appIcon';
import {AppTouchable} from '../../appTouchable';

import {Status} from '../modules';

export function ImageInputField({
  onOpenSource,
  source,
  setImageResourceStatus,
  remove,
}) {
  const {Styles, Colors} = useAppContext();
  const [imageStatus, setImageStatus] = useState(() =>
    source?.uri ? Status.LOADING : Status.LOAD_FAILED,
  );

  useEffect(() => {
    setImageStatus(source?.uri ? Status.LOADING : Status.LOAD_FAILED);
  }, [source]);

  console.log('ImageInputField-source', source);
  console.log('ImageInputField-imageStatus', imageStatus);
  return (
    <View style={styles.imageContainer}>
      <AppTouchable onPress={onOpenSource}>
        <FastImage
          source={source}
          onLoad={() => {
            setImageResourceStatus(Status.LOAD_SUCCESSFUL);
            setImageStatus(Status.LOAD_SUCCESSFUL);
          }}
          onError={() => {
            setImageResourceStatus(Status.LOAD_FAILED);
            setImageStatus(Status.LOAD_FAILED);
            remove();
          }}
          style={[Styles.border, styles.image]}>
          {imageStatus === Status.LOAD_FAILED && (
            <AppIcon name="pluscircleo" size={Sizes.icon} />
          )}
        </FastImage>
      </AppTouchable>

      <AppIcon
        size={Sizes.icon}
        name={'closecircle'}
        color={Colors.background}
        iconContainerStyle={[
          styles.clearIcon,
          {backgroundColor: Colors.onBackground},
        ]}
        onPress={remove}
        disabled={imageStatus !== Status.LOAD_SUCCESSFUL}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clearIcon: {
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.6,
    position: 'absolute',
    bottom: -Sizes.paddingLess2,
    right: -Sizes.paddingLess2,
    borderRadius: Sizes.icon / 2,
  },

  image: {
    width: Sizes.width(25),
    height: Sizes.width(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: Sizes.padding,
  },
});
