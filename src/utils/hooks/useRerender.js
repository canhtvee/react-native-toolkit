import React from 'react';

export function useRerender() {
  const [, setState] = React.useState();
  const rerender = () => setState({});
  return rerender;
}
