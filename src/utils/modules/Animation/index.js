import React, {useRef, useState} from 'react';
import {Text, View, Animated} from 'react-native';
import {AppButtonNormal, AppContainer} from '../../../commons';
import {Sizes} from '../../resources';
import {useAppContext} from '../Context';

const _space = <View style={{height: 20}} />;

export function AnimationPlayground() {
  const {Styles, Colors} = useAppContext();
  const [show, setShow] = useState(true);

  const content = useRef(new Animated.Value(1)).current;
  const placeholder = useRef(new Animated.Value(0)).current;

  const onPress = () => {
    setShow(prev => !prev);
    Animated.timing(content, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(placeholder, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    const scale = content.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0.6, 1],
    });
    const opacity = content.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0.3, 1],
    });

    if (!show) return null;
    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          height: 100,
          width: 300,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: opacity,
          transform: [{scale}, {perspective: 1000}],
        }}>
        <Text>Show content</Text>
      </Animated.View>
    );
  };

  const renderPlaceholder = () => {
    const opacity = placeholder.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [0, 0.3, 1],
    });

    const translateY = placeholder.interpolate({
      inputRange: [0, 0.6, 1],
      outputRange: [20, 10, 0],
    });

    if (show) return null;

    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          height: 80,
          width: 300,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: opacity,
          transform: [{translateY}, {perspective: 1000}],
        }}>
        <Text>Placeholder</Text>
      </Animated.View>
    );
  };

  return (
    <AppContainer edges="lrtb">
      {_space}
      {renderContent()}
      {renderPlaceholder()}
      {_space}
      <View style={{alignSelf: 'center'}}>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
        <Text>jdljdsljcdslkjklcdsjlkcjldsjcldj</Text>
      </View>
      <AppButtonNormal
        label={'Run Animation'}
        containerStyle={[
          Styles.solidButtonContainer,
          {marginHorizontal: Sizes.padding * 2},
        ]}
        onPress={onPress}
      />
    </AppContainer>
  );
}
