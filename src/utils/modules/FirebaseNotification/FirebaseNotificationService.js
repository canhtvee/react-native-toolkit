import {Platform} from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';
import messaging from '@react-native-firebase/messaging';

import {FetchApi} from '../FetchApi';

const BadgeAndroid = require('react-native-android-badge');

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    // await messaging().registerDeviceForRemoteMessages();
    getFCMToken();
  }
}

const tag = 'fcmToken';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

async function getFCMToken() {
  const fcmToken = MMKVwithID.getMap(mmkvKey);
  console.log('fcmToken', fcmToken);

  if (!fcmToken?.token) {
    try {
      let token = await messaging().getToken();
      console.log('token', token);
      if (token) {
        const result = await FetchApi.registerDeviceToken(token);
        console.log('result', result);

        if (result.token) {
          const current = MMKVwithID.getMap(mmkvKey);
          MMKVwithID.setMap(mmkvKey, {...current, ...result});
        }
      }
    } catch (error) {
      console.log('fcmToken error', error.message);
    }
  }
}

function onNotification(foregroundHandler, backgroundHandler, openNotiHandler) {
  messaging().onNotificationOpenedApp(remoteMessage => {
    //   'Notification caused app to open from background state (onClickNoti)',
    console.log('onNotificationOpenedApp', remoteMessage);
    openNotiHandler(remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage,
      );
      openNotiHandler(remoteMessage);
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground mode', remoteMessage);
    foregroundHandler(remoteMessage);
  });
}

// init in index.js
function onNotificationBackground() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('setBackgroundMessageHandler', remoteMessage);
    try {
      if (Platform.OS === 'ios') {
        return;
      }

      const unreadCount = remoteMessage?.notification?.android?.count;
      unreadCount && BadgeAndroid.setBadge(unreadCount);
      console.log('setBackgroundMessageHandler', unreadCount);
    } catch (error) {
      console.log(error);
    }
  });
}

const FirebaseNotificationService = {
  requestUserPermission,
  getFCMToken,
  onNotification,
  onNotificationBackground,
};

export {FirebaseNotificationService};
