import {AppNavigation} from './Navigation';

export function _resetToHome(navigation) {
  const _reset = navigation ? navigation.reset : AppNavigation.reset;
  _reset({
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
  const _reset = navigation ? navigation.reset : AppNavigation.reset;
  _reset({
    index: 0,
    routes: [
      {
        name: 'Login',
      },
    ],
  });
}
