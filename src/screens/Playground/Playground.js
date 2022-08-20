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
  AppInputText,
  AppViewLoading,
  VectorIcon,
} from '../../commons';
import {FetchApi, getResourceImage, Sizes, useAppContext} from '../../utils';
import {useForm} from 'react-hook-form';
import {Modal} from 'react-native';
import {KeyboardAwareScrollView} from '../../commons/keyboardAwareScrollView';

const _space = <View style={{height: 0, backgroundColor: 'red'}} />;

export function Playground() {
  const {Styles, Colors} = useAppContext();
  const [state, setState] = useState(false);
  const {control, handleSubmit} = useForm();

  const inputRefs = useRef([]);

  const onPress = async () => {
    const result = await FetchApi.getVideos();

    if (result?.message) {
      console.log('result', result);
      Alert.alert(result.message);
    }
  };

  const _inputs = [];
  for (let index = 0; index < 15; index++) {
    _inputs.push(
      <AppInputText
        key={`field ${index}`}
        label={`field ${index}`}
        name={`field ${index}`}
        control={control}
        placeholder={`field ${index}`}
        containerStyle={{
          marginTop: Sizes.padding * 2,
          paddingHorizontal: Sizes.padding * 2,
        }}
      />,
    );
  }

  return (
    <AppContainer edges="lrtb">
      <KeyboardAwareScrollView
        // getTextInputRefs={() => {
        //   return inputRefs.current;
        // }}
        style={{marginBottom: 0}}
        contentContainerStyle={{backgroundColor: 'lightgrey'}}>
        {_inputs}
      </KeyboardAwareScrollView>
      <AppButtonNormal
        label={'Submit Form'}
        containerStyle={[
          Styles.solidButtonContainer,
          {marginHorizontal: Sizes.padding * 2, marginVertical: 0},
        ]}
      />
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
