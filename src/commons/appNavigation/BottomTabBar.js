import React from 'react';
import {View} from 'react-native';

import {CommonStyles, Sizes, useAppContext} from '@utils';
import {AppTouchable} from '../appTouchable';

const bottomTabHeight = 64 + Sizes.padding;

function TabBarItem(props) {
  const {Colors} = useAppContext();

  const {options, navigation, focused, route} = props;
  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!focused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({name: route.name, merge: true});
    }
  };

  const {tabBarIcon, tabBarLabel} = options;

  let color = options.tabBarInactiveTintColor;
  let backgroundColor = Colors.background;
  if (focused) {
    color = options.tabBarActiveTintColor;
    backgroundColor = Colors.primary;
  }
  return (
    <AppTouchable
      onPress={onPress}
      style={[
        CommonStyles.center,
        {
          flex: 1,
        },
      ]}>
      <View
        style={{
          backgroundColor,
          alignItems: 'center',
          width: Sizes.wpx(84),
          paddingVertical: Sizes.padding * 0.5,
        }}>
        {tabBarIcon && tabBarIcon({focused, color})}
        {tabBarLabel && tabBarLabel({focused, color})}
      </View>
    </AppTouchable>
  );
}

export function BottomTabBar(props) {
  const {descriptors, state, navigation, getTabBarStyle} = props;
  const {routes, index} = state;

  const {Colors} = useAppContext();

  const tabBarStyle = getTabBarStyle(state);

  return (
    <View
      style={[
        CommonStyles.center,
        CommonStyles.shadow,
        {borderRadius: Sizes.ovalRadius, height: bottomTabHeight},
        tabBarStyle,
      ]}>
      <View
        style={{
          flexDirection: 'row',
          height: bottomTabHeight,
          width: Sizes.deviceWidth,
          backgroundColor: Colors.transparent,
          paddingBottom: Sizes.paddinglx,
        }}>
        {routes.map((item, i) => {
          return (
            <TabBarItem
              key={item.key}
              route={item}
              {...descriptors[item.key]}
              focused={index === i}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
}
