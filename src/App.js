import React, {useEffect} from 'react';
import {UIManager} from 'react-native';
import {enableScreens} from 'react-native-screens';
import CodePush from 'react-native-code-push';
import {QueryClient, QueryClientProvider} from 'react-query';

import {AppContextProvider, appKeys} from '@utils';
import {AppContent} from './containers/AppContent';

enableScreens();
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    // Orientation.lockToPortrait();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </QueryClientProvider>
  );
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: appKeys.codePush,
};

export default CodePush(codePushOptions)(App);
