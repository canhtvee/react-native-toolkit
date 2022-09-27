import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AppNavigation, useAppContext} from '@utils';
import * as AppScreens from '@screens';

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
              name={'Search'}
              component={AppScreens.Search}
            />
          </StackRoot.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
