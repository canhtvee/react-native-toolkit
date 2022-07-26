import React from 'react';
import {Sizes, useAppContext} from '../../utils';
import {AppIcon} from './AppIcon';

export function MaskIcon({
  setSecure,
  secure,
}: {
  setSecure: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  secure?: boolean;
}) {
  const {Colors} = useAppContext();
  return (
    <AppIcon
      onPress={() => {
        setSecure(prev => !prev);
      }}
      size={Sizes.icon}
      color={Colors.icon}
      name={{feather: secure ? 'eye' : 'eye-off'}}
      touchStyle={{
        marginRight: Sizes.paddingLess1,
      }}
      hitSlop
    />
  );
}
