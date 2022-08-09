import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

import {CONSTANTS, Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';
import {AppImageRemote} from '../appImage';

import {ImageInputSourceCamera} from './ImageInputSourceCamera';
import {ImageInputSourceGallery} from './ImageInputSourceGallery';

export function ImageInput({
  inputContainerStyle,
  placeholder,
  showClearIcon = true,
  onChange,
  value,
  imageStyle,
  ...imageProps
}) {
  const {Colors, Styles} = useAppContext();
  const [imageResource, setImageResource] = useState(null);
  const bottomSheetRef = useRef(null);

  const onOpenImagePicker = () => bottomSheetRef?.current?.present();
  const onCloseImagePicker = () => bottomSheetRef?.current?.close();

  console.log('imageResource', imageResource);
  console.log('value', value);

  useEffect(() => {
    if (imageResource?.status === CONSTANTS.STATUS.SUCCESSFUL) {
      onChange(imageResource.data);
      return;
    }
    if (imageResource?.status === CONSTANTS.STATUS.ERROR) {
      onChange();
    }
  }, [imageResource]);

  return (
    <View style={inputContainerStyle}>
      <AppTouchable
        onPress={onOpenImagePicker}
        disabled={imageResource?.status === CONSTANTS.STATUS.LOADING}>
        <AppImageRemote
          source={imageResource?.data}
          placeholder={
            placeholder || (
              <AppIcon
                name={'pluscircleo'}
                size={Sizes.h6}
                color={Colors.border}
              />
            )
          }
          isLoading={imageResource?.status === CONSTANTS.STATUS.LOADING}
          onSuccess={() =>
            setImageResource(prev => ({
              ...prev,
              status: CONSTANTS.STATUS.SUCCESSFUL,
            }))
          }
          onError={() =>
            setImageResource(prev => ({
              ...prev,
              status: CONSTANTS.STATUS.ERROR,
            }))
          }
          style={[
            Styles.border,
            {width: Sizes.width(25), height: Sizes.width(25)},
            imageStyle,
          ]}
          {...imageProps}
        />
      </AppTouchable>
      {!!value && imageResource?.data && showClearIcon && (
        <AppIcon
          name={'closecircle'}
          size={Sizes.subtitle}
          touchStyle={[
            Styles.shadow,
            {
              position: 'absolute',
              backgroundColor: Colors.surface,
              borderRadius: Sizes.padding,
              bottom: -Sizes.paddingLess1,
              right: -Sizes.paddingLess1,
              shadowColor: Colors.surface,
            },
          ]}
          hitSlop
          onPress={() => setImageResource({})}
        />
      )}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        snapPoints={['30%']}
        enablePanDownToClose>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: Sizes.padding,
          }}>
          <ImageInputSourceCamera
            setImageResource={setImageResource}
            onCloseImagePicker={onCloseImagePicker}
          />
          <ImageInputSourceGallery
            setImageResource={setImageResource}
            onCloseImagePicker={onCloseImagePicker}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
}
