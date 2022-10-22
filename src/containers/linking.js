const linking = account => {
  const _config = {
    screens: {
      InheritApp: {
        path: 'inherit',
      },
      TermsOfUse: {
        path: 'policy',
      },
      AppIntro: 'intro',
      SignUpFinally: '/register/confirm',
      ResetPassword: '/reset-password',
    },
  };

  account?.token &&
    (_config.screens = {
      ..._config.screens,
      SlideDraw: {
        screens: {
          MainStack: {
            screens: {
              Main: {
                screens: {
                  TabOneNavigator: {
                    screens: {
                      BoxNotiList: {
                        path: '/notifications/:data',
                        parse: {
                          data: id => ({
                            boxNotiId: Number(id),
                            isFromDeepLink: true,
                          }),
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

  return {
    prefixes: [''],
    config: _config,
  };
};

export default linking;
