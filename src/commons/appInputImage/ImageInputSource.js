import React, {useImperativeHandle, useRef} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

import {CONSTANTS, FetchApi, Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

export function ImageInputSource({setImageResource}, ref) {
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
        setImageResource({status: CONSTANTS.STATUS.LOADING});
        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });
        console.log('resultUpload', resultUpload);
        setImageResource({
          status: CONSTANTS.STATUS.LOADING,
          data: {...assets[0], imageToServer: resultUpload?.data},
        });
      }
    } catch (error) {
      console.log('error', error);
      setImageResource({status: CONSTANTS.STATUS.ERROR});
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
        setImageResource({status: CONSTANTS.STATUS.LOADING});
        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });

        console.log('resultUpload', resultUpload);
        setImageResource({
          status: CONSTANTS.STATUS.LOADING,
          data: {...assets[0], imageToServer: resultUpload?.data},
        });
      }
    } catch (error) {
      console.log('error', error);
      setImageResource({status: CONSTANTS.STATUS.ERROR});
    }
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
        <AppTouchable onPress={onPressCamera} style={styles.sourceContainer}>
          <AppIcon name={'camera'} color={Colors.icon} size={Sizes.h4} />
          <Text
            style={{
              color: Colors.icon,
              fontSize: Sizes.regular,
            }}>
            {Strings.Camera}
          </Text>
        </AppTouchable>
        <AppTouchable
          onPress={onPressGallery}
          style={[styles.sourceContainer, {borderColor: Colors.border}]}>
          <AppIcon name={'image'} color={Colors.icon} size={Sizes.h4} />
          <Text
            style={{
              color: Colors.icon,
              fontSize: Sizes.regular,
            }}>
            {Strings.Gallery}
          </Text>
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
