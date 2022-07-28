import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import {Sizes, useAppContext} from '../../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';
import {AppImageRemote, AppImageRemoteSourceType} from '../appImage';

import {ImageInputSourceCamera} from './ImageInputSourceCamera';
import {ImageInputSourceGallery} from './ImageInputSourceGallery';
import {ImageInputProps, ImageResourceType} from './types';

export function ImageInput({
  inputContainerStyle,
  placeholder,
  showClearIcon = true,
  onChange,
  value,
  imageStyle,
  ...imageProps
}: ImageInputProps) {
  const {Colors, Styles} = useAppContext();
  const [imageResource, setImageResource] = useState<ImageResourceType>();
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

  const onOpenImagePicker = () => bottomSheetRef?.current?.present();
  const onCloseImagePicker = () => bottomSheetRef?.current?.close();

  console.log('imageResource', imageResource);
  console.log('value', value);

  useEffect(() => {
    if (imageResource?.status === 'successful') {
      onChange(imageResource.data);
      return;
    }
    if (imageResource?.status === 'error') {
      onChange();
    }
  }, [imageResource]);

  return (
    <View style={inputContainerStyle}>
      <AppTouchable
        onPress={onOpenImagePicker}
        disabled={imageResource?.status === 'loading'}>
        <AppImageRemote
          source={imageResource?.data as AppImageRemoteSourceType}
          placeholder={
            placeholder || (
              <AppIcon
                name={{antDesign: 'pluscircleo'}}
                size={Sizes.h6}
                color={Colors.border}
              />
            )
          }
          isLoading={imageResource?.status === 'loading'}
          onSuccess={() =>
            setImageResource(prev => ({...prev, status: 'successful'}))
          }
          onError={() => setImageResource(prev => ({...prev, status: 'error'}))}
          style={[
            Styles.border as ImageStyle,
            {width: Sizes.width(25), height: Sizes.width(25)},
            imageStyle,
          ]}
          {...imageProps}
        />
      </AppTouchable>
      {!!value && imageResource?.data && showClearIcon && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
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
