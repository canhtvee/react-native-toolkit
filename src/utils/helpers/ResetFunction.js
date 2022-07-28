import {NavigationService} from '../modules';

const ResetFunction = {
  //fix crash when navigatio is not ready
  resetToHome: navigation => {
    if (navigation) {
      navigation.reset({
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
      return;
    }

    NavigationService.reset({
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
  },
  resetToLogin: navigation => {
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Login',
          },
        ],
      });
      return;
    }
    NavigationService.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  },
};

export {ResetFunction};
