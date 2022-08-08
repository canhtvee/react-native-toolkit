import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type EdgesType = 'lr' | 'lrt' | 'lrb' | 'lrtb';

export interface AppContainerProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  loadingStyle?: StyleProp<ViewStyle>;
  edges?: EdgesType;
}

//TODO: include AppKeyBoardAccessory as default
export declare function AppContainer(props: AppContainerProps): JSX.Element;
