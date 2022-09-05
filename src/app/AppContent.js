import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {AppNavigation, useAppContext} from '../utils';
import {AppBottomSheetModal} from '../commons';
import * as AppScreens from '../screens';

const StackRoot = createStackNavigator();

export function AppContent() {
  const {Colors} = useAppContext();

  return (
    <SafeAreaProvider initialWindowMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer
          ref={AppNavigation.navigationRef}
          theme={{
            ...DefaultTheme,
            colors: {
              primary: Colors.primary,
              background: Colors.background,
              text: Colors.text,
            },
          }}>
          <BottomSheetModalProvider>
            <StackRoot.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <StackRoot.Screen
                name={AppScreens.Playground.name}
                component={AppScreens.Playground}
              />
              <StackRoot.Screen
                name={AppScreens.AppIntro.name}
                component={AppScreens.AppIntro}
              />
              <StackRoot.Screen
                name={AppScreens.ComingSoon.name}
                component={AppScreens.ComingSoon}
              />
            </StackRoot.Navigator>
            <AppBottomSheetModal.View />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
