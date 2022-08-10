import React, {useRef, useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  AppButtonNormal,
  AppContainer,
  AppImageRemote,
  AppInputImageArray,
} from '../commons';
import {Sizes, useAppContext} from '../utils';
import {FastImage} from 'react-native-fast-image';

export function Playground() {
  const {Styles} = useAppContext();
  const [state, setState] = useState(false);
  const {control, handleSubmit} = useForm({
    mode: 'all',
    defaultValues: {
      profile: [],
    },
  });

  const _space = <View style={{height: Sizes.padding}} />;

  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      {_space}

      {/* <AppInputImageArray control={control} name={'profile'} /> */}

      <AppImageRemote
        source={{
          uri: 'file:///Users/rabiloo/Library/Developer/CoreSimulator/Devices/0DB9E5BD-3260-4833-9D83-9FA58E7EBE27/data/Containers/Data/Application/024A7A84-F64B-49EA-9EBE-4B8CD6C2E866/tmp/0F79FF4C-D1C3-480C-B225-2232C6021833.jpg',
        }}
        imageStyle={[Styles.border, {width: 100, height: 100}]}
        isLoading={state}
      />
      {_space}

      <AppButtonNormal
        label={'Change'}
        containerStyle={Styles.solidButtonContainer}
        onPress={() => setState(prev => !prev)}
      />
      {_space}

      <AppButtonNormal
        label={'Submit'}
        containerStyle={Styles.solidButtonContainer}
        onPress={handleSubmit(data => console.log(data))}
      />
      {_space}

      {_space}
    </AppContainer>
  );
}
