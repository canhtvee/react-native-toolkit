import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppNavigation, useAppContext} from '@utils';
import * as AppScreens from '/features';
import linking from './linking';

const StackRoot = createStackNavigator();

export function AppContent() {
  const {Colors} = useAppContext();

  return (
    <SafeAreaProvider initialWindowMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer
          linking={linking}
          ref={AppNavigation.navigationRef}
          theme={{
            ...DefaultTheme,
            colors: {
              primary: Colors.primary,
              background: Colors.background,
              text: Colors.text,
            },
          }}>
          <StackRoot.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <StackRoot.Screen
              name={'Playground'}
              component={AppScreens.Playground}
            />
            <StackRoot.Screen
              name={'AppIntro'}
              component={AppScreens.AppIntro}
            />
            <StackRoot.Screen
              name={'ComingSoon'}
              component={AppScreens.ComingSoon}
            />
          </StackRoot.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
