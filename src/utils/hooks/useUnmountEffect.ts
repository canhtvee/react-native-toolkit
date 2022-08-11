import React from 'react';

export function useUnmountEffect(onUnmount: React.EffectCallback) {
  React.useEffect(() => {
    return onUnmount();
  }, []);
}
