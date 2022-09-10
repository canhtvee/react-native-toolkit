import React from 'react';
import {
  Edge,
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {useInteractionManager} from '@react-native-community/hooks';

import {AppViewLoading, AppViewLoadingProps} from '../appViewLoading';
import {StyleSheet} from 'react-native';

type EdgesType = 'lr' | 'lrt' | 'lrb' | 'lrtb';

export interface AppContainerProps
  extends Omit<NativeSafeAreaViewProps, 'edges'> {
  edges?: EdgesType;
  loadingProps: AppViewLoadingProps;
}

//TODO: include AppKeyBoardAccessory as default
export function AppContainer({
  children,
  style,
  edges = 'lrt',
  loadingProps,
  ...safeViewProps
}: AppContainerProps) {
  const interaction = useInteractionManager();

  return (
    <SafeAreaView
      edges={EdgesValues[edges]}
      style={[styles.container, style]}
      {...safeViewProps}>
      {interaction ? (
        children
      ) : (
        <AppViewLoading
          {...loadingProps}
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </SafeAreaView>
  );
}

const EdgesValues: Record<EdgesType, ReadonlyArray<Edge>> = {
  lr: ['left', 'right'],
  lrt: ['left', 'right', 'top'],
  lrb: ['left', 'right', 'bottom'],
  lrtb: ['left', 'right', 'top', 'bottom'],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});
