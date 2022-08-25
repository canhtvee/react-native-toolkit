import React from 'react';

export function useRerender() {
  const [, rerender] = React.useState<object | null | undefined>();
  return rerender;
}
