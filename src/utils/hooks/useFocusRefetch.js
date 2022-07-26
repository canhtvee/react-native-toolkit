import {useEffect, useRef, useCallback} from 'react';
import {AppState} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {useQueryClient} from 'react-query';

export function useFocusRefetch(key) {
  const isMountedRef = useRef(false);
  const queryClient = useQueryClient();
  useFocusEffect(
    useCallback(() => {
      // do not refetch when query is initially mounted
      if (isMountedRef.current) {
        queryClient.refetchQueries([key], {
          throwOnError: false,
        });
      }
    }, [queryClient, key]),
  );

  useEffect(() => {
    const handleAppStateChange = appState => {
      if (appState === 'active' && isMountedRef.current) {
        queryClient.refetchQueries([key], {
          throwOnError: false,
        });
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    isMountedRef.current = true;
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
}
