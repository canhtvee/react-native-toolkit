import React from 'react';
import {View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Sizes, Svgs, useAppLanguage, useAppTheme} from '@utils';
import {AppText} from '@commons';

import AllStackNavigator from './AllStackNavigator';

const Tab = createBottomTabNavigator();

const renderLabel =
  ({label}) =>
  ({focused, color}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <AppText
          style={{
            color,
            fontSize: Sizes.h8,
            fontWeight: focused ? 'bold' : 'normal',
          }}>
          {label}
        </AppText>
      </View>
    );
  };

function BottomTabNavigator({navigation}) {
  const {Colors} = useAppTheme();
  const {Strings} = useAppLanguage();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.background,
        tabBarInactiveTintColor: Colors.text,
        tabBarActiveBackgroundColor: Colors.withAlpha(Colors.background, 1),
        tabBarInactiveBackgroundColor: Colors.withAlpha(Colors.background, 1),
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen
        name="TabOneNavigator"
        component={AllStackNavigator}
        options={({route, focused}) => ({
          // tabBarShowLabel: false,
          tabBarIcon: ({focused}) => {
            return (
              <Svgs.products
                color={focused ? Colors.background : Colors.text}
              />
            );
          },
          tabBarLabel: renderLabel({
            label: Strings.Products_list,
          }),
        })}
        initialParams={{
          initialRouteName: 'TopPage',
        }}
      />

      <Tab.Screen
        name="TabTwoNavigator"
        component={AllStackNavigator}
        options={({route, navigation}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Svgs.notification
                color={focused ? Colors.background : Colors.text}
              />
            );
          },
          tabBarLabel: renderLabel({
            label: Strings.Notif,
          }),
        })}
        initialParams={{
          initialRouteName: 'ComingSoon',
        }}
      />
      <Tab.Screen
        name="TabThreeNavigator"
        component={AllStackNavigator}
        options={({route, navigation}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Svgs.later color={focused ? Colors.background : Colors.text} />
            );
          },
          tabBarLabel: renderLabel({
            label: Strings.Alarm_history,
          }),
        })}
        initialParams={{
          initialRouteName: 'ComminSoon',
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;
