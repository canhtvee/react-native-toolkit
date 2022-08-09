export function getStyleObject(style?: Array<object> | object) {
  if (Array.isArray(style)) {
    return style.reduce((prev, cur) => ({...prev, cur}));
  }
  if (style) {
    return style;
  }

  return undefined;
}
