import React from 'react';
import {
  NavigationContainerRef,
  NavigationState,
  StackActions,
} from '@react-navigation/native';

const navigationRef: React.Ref<NavigationContainerRef<any>> = React.createRef();

export const AppNavigation = {
  navigationRef,
  navigate: (name: string, params?: object) => {
    navigationRef.current?.navigate(name, params);
  },
  reset: (config: NavigationState) => {
    navigationRef.current?.reset(config);
  },
  push: (name: string, params: object) => {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  },
};

export function _resetToHome(navigation: any) {
  const _reset = navigation ? navigation.reset : AppNavigation.reset;
  _reset({
    index: 0,
    routes: [
      {
        name: 'SlideDraw',
        params: {
          name: 'Main',
          params: {
            screen: 'TabOneNavigator',
          },
        },
      },
    ],
  } as NavigationState);
}

export function _resetToLogin(navigation: any) {
  const _reset = navigation ? navigation.reset : AppNavigation.reset;
  _reset({
    index: 0,
    routes: [
      {
        name: 'Login',
      },
    ],
  } as NavigationState);
}
