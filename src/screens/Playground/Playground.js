import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppAsyncImage,
  AppButtonNormal,
  AppContainer,
  AppIcon,
  AppInputImageArray,
  AppInputImageAvatar,
  AppViewLoading,
  VectorIcon,
} from '../../commons';
import {FetchApi, getResourceImage, Sizes, useAppContext} from '../../utils';
import {useForm} from 'react-hook-form';
import {Modal} from 'react-native';

const _space = <View style={{height: Sizes.padding}} />;

export function Playground() {
  const {Styles, Colors} = useAppContext();
  const [state, setState] = useState(false);
  const {control, handleSubmit} = useForm();

  const onPress = async () => {
    const result = await FetchApi.getVideos();

    if (result?.message) {
      console.log('result', result);
      Alert.alert(result.message);
    }
  };
  return (
    <AppContainer style={{padding: Sizes.padding * 2}}>
      {/* <AppInputImageArray control={control} name={'avatar'} /> */}
      {_space}
      <AppButtonNormal
        label={'Submit'}
        containerStyle={Styles.solidButtonContainer}
        // onPress={handleSubmit(data => console.log('form', data))}
        onPress={onPress}
      />
      {_space}
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
