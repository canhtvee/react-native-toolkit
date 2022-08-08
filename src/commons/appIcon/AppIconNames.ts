/**
 *
 * To use AppIconNames interface to simplify icon refactoring
 */

export const AppIconNames = {
  'eye-off': {feather: 'eye-off'},
  eye: {feather: 'eye'},
  closecircle: {antDesign: 'closecircle'},
  closecircleo: {antDesign: 'closecircleo'},
  'arrow-down': {feather: 'chevron-down'},
  'arrow-up': {feather: 'chevron-up'},
  calendar: {feather: 'calendar'},
  search: {antDesign: 'search1'},
};

export type AppIconNamesType = keyof typeof AppIconNames;
