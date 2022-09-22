import React, {useEffect} from 'react';
import {UIManager} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import {enableScreens} from 'react-native-screens';
import {AppContextProvider} from './utils';
import {AppContent} from './container';

enableScreens();

const queryClient = new QueryClient();

export default function App() {
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

// const codePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   deploymentKey: appKeys.codePush,
// };

// export default CodePush(codePushOptions)(App);
