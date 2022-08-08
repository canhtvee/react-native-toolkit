import React from 'react';
import {View, Text} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';

import {useAppBottomSheetModal} from './AppBottomSheetModal';

export function AppBottomSheetModalTopBar({
  title,
  titleStyle,
  showIcon = true,
}) {
  const {Colors} = useAppContext();
  const {onCloseModal} = useAppBottomSheetModal();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.padding,
        paddingTop: 0,
      }}>
      <Text style={[{fontWeight: 'bold'}, titleStyle]}>{title}</Text>
      {showIcon && (
        <AppIcon
          name={{antDesign: 'close'}}
          size={Sizes.icon}
          iconStyle={{color: Colors.icon}}
          touchStyle={{
            padding: Sizes.paddingLess1,
            backgroundColor: Colors.hover,
            borderRadius: Sizes.padding,
          }}
          hitSlop
          onPress={onCloseModal}
        />
      )}
    </View>
  );
}
