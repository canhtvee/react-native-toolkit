import React from 'react';

export function useRerender() {
  const [, setState] = React.useState<object | null | undefined>();
  const rerender = () => setState({});
  return rerender;
}
