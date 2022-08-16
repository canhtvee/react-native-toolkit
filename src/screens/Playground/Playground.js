import React, {useState} from 'react';
import {StyleSheet, View, Alert, Button} from 'react-native';
import {AppButtonNormal, AppContainer} from '../../commons';
import {FetchApi, Sizes, useAppContext} from '../../utils';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const _space = <View style={{height: Sizes.padding}} />;

export function Playground() {
  const {Styles} = useAppContext();

  const onPress = async () => {
    const result = await FetchApi.getVideos();

    if (result?.message) {
      console.log('result', result);
      Alert.alert(result.message);
    }
  };

  const height = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });
  console.log('rerender playground');
  return (
    <AppContainer style={{padding: Sizes.padding * 2}}>
      <Animated.View style={[{backgroundColor: 'red'}, animatedStyle]} />
      {_space}
      <Button
        title="Animating"
        onPress={() => (height.value = withTiming(Math.random() * 300))}
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
