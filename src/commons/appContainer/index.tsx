import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';

import {AppViewLoading} from '../appViewLoading';

type EdgesType = 'lr' | 'lrt' | 'lrb' | 'lrtb';
type EdgesValueType = Record<EdgesType, Array<Edge>>;

export interface AppContainerProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  loadingStyle?: StyleProp<ViewStyle>;
  edges?: EdgesType;
}

const _edgesValue: EdgesValueType = {
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
  loadingStyle,
}: AppContainerProps) {
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
