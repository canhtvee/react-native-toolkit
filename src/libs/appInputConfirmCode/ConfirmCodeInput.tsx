import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TextInputKeyPressEventData,
} from 'react-native';

import {ControllerRenderProps} from 'react-hook-form';
import {Sizes} from '../../utils';

export interface ConfirmCodeInputProps
  extends Omit<ControllerRenderProps, 'name' | 'onBlur' | 'ref'> {
  codeInputLength: number;
  codeLength: number;
  containerStyle?: StyleProp<ViewStyle>;
  codeInputStyle?: StyleProp<TextStyle>;
  codeInputProps?: Omit<
    TextInputProps,
    'autoFocus' | 'secureTextEntry' | 'defaultValue'
  >;
  secureTextEntry?: boolean;
  onDone?: () => void;
}

export function ConfirmCodeInput({
  codeLength,
  codeInputLength,
  onChange,
  value,
  secureTextEntry,
  containerStyle,
  codeInputStyle,
  codeInputProps,
  onDone,
}: ConfirmCodeInputProps) {
  const [codeArr, setCodeArr] = useState(new Array(codeLength).fill(''));
  const [focusIndex, setFocusIndex] = useState(0);
  const codeInputRefs = useRef<Array<TextInput>>(new Array(codeLength));

  // To update if form value changed
  useEffect(() => {
    if (value && value?.length === codeLength * codeInputLength) {
      let newArr = [];
      for (let i = 0; i < codeLength; i++) {
        newArr[i] = value.substring(
          codeInputLength * i,
          codeInputLength * (i + 1),
        );
      }
      setCodeArr(newArr);
      setFocusIndex(codeLength - 1);
    }
    if (!value) {
      setCodeArr(new Array(codeLength).fill(''));
      setFocusIndex(0);
    }
  }, [value]);

  // To update focus state
  useEffect(() => {
    codeInputRefs.current[focusIndex]?.focus();
  }, [focusIndex]);

  // To handle input change
  const onInputCode = (text: string, index: number) => {
    let newCodeArr = [...codeArr];
    newCodeArr[index] = text;
    onChange && onChange(newCodeArr.join(''));

    if (index === codeLength - 1) {
      if (newCodeArr[index].length === codeInputLength) {
        if (onDone) {
          codeInputRefs.current[focusIndex]?.blur();
          onDone();
        }
      }
    } else {
      if (newCodeArr[index].length < codeInputLength) {
        setCodeArr(newCodeArr);
      } else {
        setFocusIndex(index + 1);
      }
    }

    setCodeArr(newCodeArr);
  };

  //To handle backspace press
  const handleKeyPress = (
    index: number,
    nativeEvent: TextInputKeyPressEventData,
  ) => {
    console.log('key', nativeEvent.key);
    if (nativeEvent.key === 'Backspace') {
      if (codeArr[index].length === 0 && index > 0) {
        setFocusIndex(index - 1);
      }
      return;
    }
  };

  const renderItems = () => {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      codeInputs.push(
        <TextInput
          key={`${i}`}
          ref={ref => (codeInputRefs.current[i] = ref!)}
          value={codeArr[i]}
          autoFocus={i === 0}
          editable={i === focusIndex}
          secureTextEntry={secureTextEntry}
          onKeyPress={({nativeEvent}) => handleKeyPress(i, nativeEvent)}
          underlineColorAndroid="transparent"
          returnKeyType={'done'}
          onChangeText={text => onInputCode(text, i)}
          maxLength={codeInputLength}
          keyboardType={'numeric'}
          style={[
            {
              textAlign: 'center',
              borderWidth: Sizes.borderWidth,
              fontSize: Sizes.regular,
              padding: Sizes.padding,
              minWidth: Sizes.regular + Sizes.padding * 2,
            },
            codeInputStyle,
          ]}
          {...codeInputProps}
        />,
      );
    }
    return codeInputs;
  };

  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: Sizes.padding,
        },
        containerStyle,
      ]}>
      {renderItems()}
    </View>
  );
}
