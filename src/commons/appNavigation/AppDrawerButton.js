import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {AppIcon} from '../appIcon';

export function AppDrawerButton({onPress}) {
  const navigation = useNavigation();

  const onOpenDrawer = () => {
    navigation?.toggleDrawer && navigation.toggleDrawer();
  };

  return (
    <AppIcon
      name={{antDesign: 'menufold'}}
      hitSlop
      onPress={onPress || onOpenDrawer}
    />
  );
}
