import React from 'react';

export function useTimeoutSession() {
  const timeoutRef = React.useRef<NodeJS.Timeout | null | undefined>();

  const setTimeoutSession = (callback: (args: void) => void, ms?: number) => {
    if (timeoutRef.current) {
      console.log('timeoutRef', timeoutRef.current);
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(callback, ms);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return setTimeoutSession;
}
