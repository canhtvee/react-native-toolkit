import React from 'react';

export function useTimeout() {
  const timerRef = React.useRef<NodeJS.Timeout | null | undefined>();

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return React.useCallback((callback: (args: void) => void, ms: number) => {
    if (timerRef.current) {
      console.log('timeoutRef', timerRef.current);
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, ms);
  }, []);
}
