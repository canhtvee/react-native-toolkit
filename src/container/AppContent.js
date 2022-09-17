import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {AppNavigation, Sizes, useAppContext} from '../utils';
import {AppBottomSheetModal, AppSearchInput} from '../commons';
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
          <StackRoot.Navigator
            screenOptions={{
              headerShown: true,
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

            <StackRoot.Screen
              options={{
                presentation: 'modal',
                headerShown: false,
                headerTitleStyle: {display: 'none'},
                // headerLeft: () => (
                //   <AppSearchInput
                //     containerStyle={{
                //       width: Sizes.width(80),
                //       marginLeft: Sizes.padding,
                //       borderWidth: 0,
                //       backgroundColor: Colors.hover,
                //     }}
                //   />
                // ),
                // headerStyle: {
                //   backgroundColor: 'white',
                //   borderBottomWidth: 0,
                // },
              }}
              name={AppScreens.Search.name}
              component={AppScreens.Search}
            />
          </StackRoot.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
