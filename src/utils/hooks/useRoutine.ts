import React from 'react';

export type RoutineFunction = () => Promise<void>;

export function useRoutine() {
  const [isPending, setIsPending] = React.useState<boolean>();

  const startRoutine = React.useCallback(
    (handler: RoutineFunction) => async () => {
      setIsPending(true);
      await handler();
      setIsPending(false);
    },
    [setIsPending],
  );

  return [isPending, startRoutine];
}
