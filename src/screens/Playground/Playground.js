import React, {useImperativeHandle, useRef, useState} from 'react';
import {Text, View} from 'react-native';

import {AppButtonNormal, AppContainer, AppInputText} from '../../commons';
import {ComonStyles, Sizes} from '../../utils';
import {FormProvider, useForm} from 'react-hook-form';

const _space = <View style={{height: 20}} />;

export const Playground = () => {
  const methods = useForm();
  const progressRef = useRef({item: null});
  const a = null;
  const b = 'kdsks';
  const c = null;

  const _element = a && b && c && <TestRender />;

  return (
    <FormProvider {...methods}>
      <AppContainer edges="lrtb">
        <View style={{flex: 1, paddingHorizontal: Sizes.padding * 2}}>
          {_space}

          {_space}

          {_element}
          <AppButtonNormal
            label={'Run Animation'}
            containerStyle={[
              ComonStyles.solidButtonContainer,
              {marginHorizontal: Sizes.padding * 2},
            ]}
          />
          <WatchingProgress />
        </View>
      </AppContainer>
    </FormProvider>
  );
};

const TestRender = () => {
  console.log('render component');
  return <Text>TestRender</Text>;
};

WatchingProgress = React.forwardRef(WatchingProgress);

function WatchingProgress(props, ref) {
  const [progress, setProgress] = useState(0);
  useImperativeHandle(ref, () => ({
    updateProgess: () => {
      setProgress('duration');
    },
  }));

  return (
    <View>
      <Text>{progress}</Text>
    </View>
  );
}
