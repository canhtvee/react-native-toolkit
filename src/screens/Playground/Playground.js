import React from 'react';
import {
  View,
  findNodeHandle,
  TextInput,
  ScrollView,
  Keyboard,
  createElement,
  UIManager,
} from 'react-native';

import {AppButtonNormal, AppContainer} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';
import {FormProvider, useForm} from 'react-hook-form';

const _space = <View style={{height: 20}} />;

const fields = new Array(20).fill(null);

export const Playground = () => {
  const [, rerender] = React.useState();
  const [state, setState] = React.useState();
  const methods = useForm();
  const scrollViewRef = React.useRef();
  const inputRefs = React.useRef(new Array(10).fill(null));

  const onPress = async () => {
    rerender({});
  };

  console.log(createElement);

  React.useEffect(() => {
    const listeners = [];
    listeners[0] = Keyboard.addListener('keyboardDidShow', event => {
      const newKeyboardHeight = event.endCoordinates.height;
      if (state === newKeyboardHeight) {
        return;
      }

      setState(newKeyboardHeight);

      const _focused = inputRefs.current.find(_r => _r.isFocused());
      const _node = findNodeHandle(_focused);

      console.log(_focused?._nativeTag);
      console.log(_node);
      scrollViewRef?.current
        ?.getScrollResponder()
        ?.scrollResponderScrollNativeHandleToKeyboard(_node, 100, true);
    });
    listeners[1] = Keyboard.addListener('keyboardDidHide', event => {
      setState(0);
    });

    console.log(listeners);
    return () => listeners.forEach(_l => _l.remove());
  }, []);

  return (
    <FormProvider {...methods}>
      <AppContainer>
        <ScrollView
          ref={scrollViewRef}
          style={{padding: Sizes.padding * 2}}
          contentInset={{bottom: state}}
          onLayout={() => {}}>
          {_space}

          {fields.map((_, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={[
                CommonStyles.border,
                CommonStyles.textInputPadding,
                {marginBottom: Sizes.padding * 2},
              ]}
              placeholder={`field - ${index}`}
              clearButtonMode="while-editing"
            />
          ))}
          <AppButtonNormal
            label={'Change State'}
            containerStyle={[CommonStyles.solidButtonContainer]}
            onPress={onPress}
          />
        </ScrollView>
      </AppContainer>
    </FormProvider>
  );
};
