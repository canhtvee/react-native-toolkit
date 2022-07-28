import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Controller, useFormContext, useFormState} from 'react-hook-form';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';

import {
  ComonStyle,
  Icons,
  IconTypes,
  Sizes,
  useAppLanguage,
  useAppTheme,
  FetchApi,
} from '../../utils';

import {AppText} from '../AppText';
import {AppIcon} from '../AppIcon';
import {AppImage} from '../AppImage';
import {AppTouchable} from '../AppTouchable';
import {AppViewLoading} from '../AppViewLoading';

function AppInputImageSourceItem({
  onPress,
  title,
  icon,
  type = IconTypes.Feather,
}) {
  const {Colors} = useAppTheme();

  return (
    <AppTouchable
      onPress={onPress}
      style={[
        ComonStyle.center,
        ComonStyle.border(Colors.primary),
        {
          borderRadius: Sizes.border_radius,
          padding: Sizes.padding / 2,
          minWidth: Sizes.width(25),
        },
      ]}>
      <AppIcon
        name={icon}
        type={type}
        color={Colors.primary}
        size={Sizes.title * 1.2}
      />
      <AppText
        style={{
          color: Colors.primary,
          fontSize: Sizes.large,
          paddingTop: Sizes.padding / 2,
        }}>
        {title}
      </AppText>
    </AppTouchable>
  );
}
function AppInputImageSource({source, onPress, imageStyle, loading}) {
  console.log('source', source);
  if (!source) {
    return <AppTouchable onPress={onPress} style={imageStyle} />;
  }
  if (loading) {
    return <AppViewLoading />;
  }
  return (
    <AppTouchable onPress={onPress} style={ComonStyle.center}>
      <AppImage
        noCache
        source={source}
        style={{
          width: Sizes.width(25),
          height: Sizes.width(25),
          borderRadius: Sizes.width(12.5),
          ...imageStyle,
        }}
      />
    </AppTouchable>
  );
}
export function AppInputImageArray({
  control,
  prepend,
  fieldArrayName,
  fieldArrayItemIndex,
  fieldArrayItemChildKey,
  rules,
  containerStyle,
  style,
  imageStyle,
  renderIcon,
  renderClearIcon,
}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef(null);

  const onPressShowImagePicker = async () => {
    bottomSheetRef.current.present();
  };

  const onPrepend = () => {
    fieldArrayItemIndex === 0 && prepend({item: {}});
  };

  const onPressLaunchCamera = onChooseImage => async () => {
    bottomSheetRef.current.close();
    try {
      const {assets} = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('onPressLanchCamera', assets);
      if (assets && assets.length) {
        setLoading(true);
        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });
        setLoading(false);
        console.log('resultUpload', resultUpload);
        onChooseImage({...assets[0], imageToServer: resultUpload.data});
        onPrepend();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const onPressLaunchGallery = onChooseImage => async () => {
    bottomSheetRef.current.close();
    try {
      const {assets} = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      console.log('onPressLaunchGallery', assets);
      if (assets && assets.length) {
        setLoading(true);
        const resultUpload = await FetchApi.uploadFile({
          uri: assets[0].uri,
          name: assets[0].fileName,
        });
        setLoading(false);
        console.log('resultUpload', resultUpload);
        onChooseImage({...assets[0], imageToServer: resultUpload.data});
        onPrepend();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const renderBackdrop = props => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );

  return (
    <AppTouchable
      onPress={onPressShowImagePicker}
      style={[ComonStyle.center, containerStyle]}>
      <View
        style={[
          ComonStyle.center,
          ComonStyle.border(Colors.placeholder),
          {
            width: Sizes.width(25),
            height: Sizes.width(25),
            borderRadius: Sizes.width(12.5),
            borderWidth: Sizes.border * 3,
          },
          style,
        ]}>
        <Controller
          name={`${fieldArrayName}.${fieldArrayItemIndex}.${fieldArrayItemChildKey}`}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            return (
              <View>
                <AppInputImageSource
                  source={value}
                  onPress={onPressShowImagePicker}
                  imageStyle={imageStyle}
                  loading={loading}
                />
                <BottomSheetModal
                  ref={bottomSheetRef}
                  index={0}
                  backdropComponent={renderBackdrop}
                  snapPoints={['30%']}
                  enablePanDownToClose>
                  <View
                    style={[
                      ComonStyle.center,
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingTop: Sizes.padding,
                      },
                    ]}>
                    <AppInputImageSourceItem
                      icon={Icons.Feather_camera}
                      title={Strings.Camera}
                      onPress={onPressLaunchCamera(onChange)}
                    />
                    <AppInputImageSourceItem
                      icon={Icons.Feather_image}
                      title={Strings.Gallery}
                      onPress={onPressLaunchGallery(onChange)}
                    />
                  </View>
                </BottomSheetModal>
                {!!renderIcon && !loading && (
                  <AppTouchable onPress={onPressShowImagePicker}>
                    {renderIcon()}
                  </AppTouchable>
                )}
              </View>
            );
          }}
        />
        {renderClearIcon && renderClearIcon()}
      </View>
    </AppTouchable>
  );
}
