import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  AppAsyncImage,
  AppButtonNormal,
  AppContainer,
  AppInputImageAvatar,
  AppViewLoading,
} from '../../commons';
import {
  getResourceImage,
  Sizes,
  useAppContext,
  useTimeoutSession,
} from '../../utils';
import {useForm} from 'react-hook-form';
import {Modal} from 'react-native';

const _space = <View style={{height: Sizes.padding}} />;

export function Playground() {
  const {Styles, Colors} = useAppContext();
  const [state, setState] = useState(false);
  const {control} = useForm();
  const setTimeoutSession = useTimeoutSession();

  const ref = useRef(1);

  // useEffect(() => {
  //   if (state) {
  //     setTimeoutSession(() => setState(false), 2000);
  //   }
  // }, [state]);

  console.log('___________________');
  console.log('render-ref', ref.current);
  console.log('render-state', state);
  console.log('___________________');

  return (
    <AppContainer style={{padding: Sizes.padding * 2}}>
      {/* <AppAsyncImage
        imageStyle={[Styles.border, Styles.circle(20), {marginHorizontal: 50}]}
        source={
          state
            ? getResourceImage('app_logo')
            : {
                uri: 'https://i.pinimg.com/550x/eb/02/1e/eb021ed07264eb50ca83d1606f9ee58b.jpgd',
              }
        }
      /> */}

      {_space}

      <AppButtonNormal
        label={'Change'}
        containerStyle={Styles.solidButtonContainer}
        onPress={() => {
          setState(prev => !prev);
          ref.current = ref.current + 1;
          console.log('onPress-ref', ref.current);
          console.log('onPress-state', state);
        }}
      />
      {_space}
      {/* 
      {state && (
        <AppViewLoading
          overlay
          loadingText="Uploading..."
          loadingTextStyle={{marginTop: Sizes.paddingLess2}}
        />
      )} */}
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
