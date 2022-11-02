import {useEffect} from 'react';
// import {AppState} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {AppNotiPopup} from '../../../elements';

import {isIOS} from '../../resource';
import {Images} from '../../images';

import {FirebaseNotificationService} from '../Notification';
import {useAppLanguage} from '../Language';

import {BoxNotiService} from './BoxNotiService';
import {getBoxNotiIdFromUrl} from './getBoxNotiIdFromUrl';

const BadgeAndroid = require('react-native-android-badge');

export function useConfigBoxNoti() {
  const {Strings} = useAppLanguage();
  const navigation = useNavigation();

  useEffect(() => {
    const foregroundHandler = message => {
      if (!message) {
        return;
      }

      AppNotiPopup.show({
        title: message?.notification?.title,
        body: message?.notification?.body,
        appIconSource: Images.logoBase,
        appTitle: Strings.App_name,
        timeText: Strings.Just_now,
        onPress: () => openNotiHandler(message),
      });

      BoxNotiService.onChange({
        eventName: 'hasNewNotiOnforeground',
        data: {},
      });
    };

    const openNotiHandler = message => {
      if (!message) {
        return;
      }
      const newUnreadCount = isIOS
        ? message?.notifcation?.ios?.badge
        : message?.notifcation?.android?.count;

      !!newUnreadCount &&
        BoxNotiService.onChange({
          eventName: 'updateUnreadCount',
          data: {unreadCount: newUnreadCount},
        });
      navigation.navigate('BoxNotiList', {
        data: {
          boxNotiId: getBoxNotiIdFromUrl(message?.data?.url),
          isFromPopUp: true,
        },
      });
    };

    const backgroundHandler = message => {
      if (!message) {
        return;
      }
    };

    FirebaseNotificationService.requestUserPermission();
    FirebaseNotificationService.onNotification(
      foregroundHandler,
      backgroundHandler,
      openNotiHandler,
    );

    // To update badge if update unreadCount
    const badgeListener = isIOS
      ? event => {
          event.eventName === 'updateUnreadCount' &&
            PushNotificationIOS.setApplicationIconBadgeNumber(
              event.data.unreadCount,
            );
        }
      : event => {
          event.eventName === 'updateUnreadCount' &&
            BadgeAndroid?.setBadge(event.data.unreadCount);
        };

    const updateUnreadCountSubscription =
      BoxNotiService.addListener(badgeListener);

    return () => {
      updateUnreadCountSubscription.resetContext();
    };
  }, []);
}
