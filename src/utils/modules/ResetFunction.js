import {AppNavigation} from './AppNavigation';

//fix crash when navigatio is not ready

export function _resetToHome(navigation) {
  return navigation
    ? navigation.reset({
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
      })
    : AppNavigation.reset({
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
      });
}

export function _resetToLogin(navigation) {
  return navigation
    ? navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      })
    : AppNavigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
}
