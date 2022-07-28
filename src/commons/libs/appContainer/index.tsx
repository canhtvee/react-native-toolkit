import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';

import {Sizes} from '../../../utils';
import {AppViewLoading} from '../appViewLoading';

type EdgesType =
  | 'left-right'
  | 'left-right-top'
  | 'left-right-bottom'
  | 'left-right-top-bottom';
type EdgesValueType = Record<EdgesType, Array<Edge>>;

export interface AppContainerProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: EdgesType;
}

const _edgesValue: EdgesValueType = {
  'left-right': ['left', 'right'],
  'left-right-top': ['left', 'right', 'top'],
  'left-right-bottom': ['left', 'right', 'bottom'],
  'left-right-top-bottom': ['left', 'right', 'top', 'bottom'],
};

//TODO: include AppKeyBoardAccessory as default
export function AppContainer({
  children,
  style,
  edges = 'left-right-top',
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
        <AppViewLoading containerStyle={{marginTop: Sizes.padding * 2}} />
      )}
    </SafeAreaView>
  );
}
