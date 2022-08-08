import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

export function ConfirmCodeInput({
  codeLength,
  codeInputLength,
  onChange,
  value,
  secureTextEntry,
  inputContainerStyle,
  codeInputStyle,
  codeInputProps,
  onDone,
}) {
  const {Colors} = useAppContext();
  const [codeArr, setCodeArr] = useState(new Array(codeLength).fill(''));
  const [focusIndex, setFocusIndex] = useState(0);
  const codeInputRefs = useRef(new Array(codeLength));

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
  const onInputCode = (text, index) => {
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
  const handleKeyPress = (index, nativeEvent) => {
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
          ref={ref => (codeInputRefs.current[i] = ref)}
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
          style={[styles.codeInput, {color: Colors.text}, codeInputStyle]}
          {...codeInputProps}
        />,
      );
    }
    return codeInputs;
  };

  return (
    <View style={[styles.container, inputContainerStyle]}>{renderItems()}</View>
  );
}

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding,
  },
  codeInput: {
    textAlign: 'center',
    borderWidth: Sizes.borderWidth,
    fontSize: Sizes.regular,
    padding: Sizes.padding,
    minWidth: Sizes.regular + Sizes.padding * 2,
  },
});
