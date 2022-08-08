import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';

import {AppViewLoading} from '../appViewLoading';

const _edgesValue = {
  lr: ['left', 'right'],
  lrt: ['left', 'right', 'top'],
  lrb: ['left', 'right', 'bottom'],
  lrtb: ['left', 'right', 'top', 'bottom'],
};

//TODO: include AppKeyBoardAccessory as default
export function AppContainer({children, style, edges = 'lrt', loadingStyle}) {
  const interaction = useInteractionManager();

  return (
    <SafeAreaView
      edges={_edgesValue[edges]}
      style={[
        {
          flex: 1,
          justifyContent: 'flex-start',
        },
        style,
      ]}>
      {interaction ? (
        children
      ) : (
        <AppViewLoading containerStyle={loadingStyle} />
      )}
    </SafeAreaView>
  );
}
