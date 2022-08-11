import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {Sizes} from '../../../utils';

export function Header() {
  useEffect(() => {
    return () => console.log('unmount header');
  }, []);

  return (
    <Text style={{fontSize: Sizes.h5, alignSelf: 'center'}}>Playground</Text>
  );
}
