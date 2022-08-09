import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {AppViewLoadingProps} from '../appViewLoading';

type EdgesType = 'lr' | 'lrt' | 'lrb' | 'lrtb';

export interface AppContainerProps extends AppViewLoadingProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: EdgesType;
}

//TODO: include AppKeyBoardAccessory as default
export declare function AppContainer(props: AppContainerProps): JSX.Element;
