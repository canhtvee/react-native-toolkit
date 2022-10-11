import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  useAppTheme,
  FirebasePushNotificationHelper,
  useAppLanguage,
} from '../utils';

import AllStackNavigator from './AllStackNavigator';

const Stack = createStackNavigator();

function TabOneNavigator({navigation}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();
  // useEffect(() => {

  //   const notif = new NotifService({
  //     onNotification: notification => {
  //       console.log('onNotification', notification);
  //       if (notification.foreground && !notification.userInteraction) {
  //         //sync hasNew notification api
  //         // queryClient.refetchQueries(['HealthTest-has-new-noti'], {
  //         //   throwOnError: false,
  //         // });
  //         let onPress;
  //         if (notification.data && notification.data.data) {
  //           // onPress = () => pushToDetailNotification(notification);
  //         }
  //         const notificationObject = {
  //           appTitle: Strings.App_name,
  //           timeText: Strings.Now,
  //           onPress,
  //         };
  //         notificationObject.title =
  //           notification.title || notification.data?.title;
  //         notificationObject.body =
  //           notification.message || notification.data?.message;
  //         InAppNotificationService.set(notificationObject);
  //       } else if (notification.userInteraction) {
  //         // pushToDetailNotification(notification);
  //       }
  //     },
  //   });
  //   const requestTimeOut = setTimeout(() => {
  //     notif.requestPermissions();
  //   }, 500);
  //   return () => {
  //     clearTimeout(requestTimeOut);
  //   };
  // }, []);

  useEffect(() => {
    FirebasePushNotificationHelper.requestUserPermission();
    FirebasePushNotificationHelper.notificationListener(e => {
      console.log('notificationListener', e);
      // if (e?.body?.data?.id) {
      //   navigation.push('NotificationDetail', {dataProps: id});
      //   return;
      // }
      // navigation.push('Notification');
    });
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllStackNavigator"
        component={AllStackNavigator}
        initialParams={{
          initialRouteName: 'TopPage',
        }}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default TabOneNavigator;
