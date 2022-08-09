import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';

import {AppViewLoading} from '../appViewLoading';

const EdgesValues = {
  lr: ['left', 'right'],
  lrt: ['left', 'right', 'top'],
  lrb: ['left', 'right', 'bottom'],
  lrtb: ['left', 'right', 'top', 'bottom'],
};

//TODO: include AppKeyBoardAccessory as default
export function AppContainer({
  children,
  style,
  edges = 'lrt',
  ...loadingProps
}) {
  const interaction = useInteractionManager();

  return (
    <SafeAreaView
      edges={EdgesValues[edges]}
      style={[
        {
          flex: 1,
          justifyContent: 'flex-start',
        },
        style,
      ]}>
      {interaction ? children : <AppViewLoading {...loadingProps} />}
    </SafeAreaView>
  );
}
