import React, {useImperativeHandle, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

import {FetchApi, Sizes, useAppContext} from '@utils';

import {AppIcon} from '../../appIcon';
import {AppTouchable} from '../../appTouchable';

import {Status} from '../modules';

ImageArraySource = React.forwardRef(ImageArraySource);

export function ImageArraySource({setImageResourceStatus, append}, ref) {
  const {Colors, Strings} = useAppContext();
  const bottomSheetRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      bottomSheetRef?.current?.present();
    },
  }));

  const onPressCamera = async () => {
    bottomSheetRef?.current?.close();
    try {
      const {assets} = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('onPressLanchCamera', assets);
      if (assets && assets.length) {
        setImageResourceStatus(Status.UPLOADING);

        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });
        console.log('resultUpload', resultUpload);

        setImageResourceStatus(Status.UPLOAD_SUCCESSUL);

        append({item: {...assets[0], imageToServer: resultUpload?.data}});
      }
    } catch (error) {
      console.log('error', error);

      setImageResourceStatus(Status.UPLOAD_FAILED);
    }
  };

  const onPressGallery = async () => {
    bottomSheetRef?.current?.close();
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('onPressLaunchGallery', assets);
      if (assets && assets.length) {
        setImageResourceStatus(Status.UPLOADING);

        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });

        console.log('resultUpload', resultUpload);

        setImageResourceStatus(Status.UPLOAD_SUCCESSUL);

        append({item: {...assets[0], imageToServer: resultUpload?.data}});
      }
    } catch (error) {
      console.log('error', error);
      setImageResourceStatus(Status.UPLOAD_FAILED);
    }
  };

  const _styles = {
    sourceContainer: {borderColor: Colors.border},
    sourceTitle: {
      color: Colors.icon,
      paddingTop: Sizes.padding,
      fontSize: Sizes.regular,
    },
  };

  return (
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
      <View style={styles.container}>
        <AppTouchable
          onPress={onPressCamera}
          style={[styles.sourceContainer, _styles.sourceContainer]}>
          <AppIcon name={'camera'} size={Sizes.h4} color={Colors.icon} />
          <Text style={_styles.sourceTitle}>{Strings.camera}</Text>
        </AppTouchable>
        <AppTouchable
          onPress={onPressGallery}
          style={[styles.sourceContainer, _styles.sourceContainer]}>
          <AppIcon name={'image'} size={Sizes.h4} color={Colors.icon} />
          <Text style={_styles.sourceTitle}>{Strings.gallery}</Text>
        </AppTouchable>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  sourceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizes.borderRadius,
    borderWidth: Sizes.borderWidth,
    padding: Sizes.padding,
    minWidth: Sizes.width(25),
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Sizes.padding,
  },
});
