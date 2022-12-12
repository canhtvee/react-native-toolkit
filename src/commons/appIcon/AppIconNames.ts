import {VectorIconNameType} from './VectorIcon';

export type AppIconNameType =
  | 'eyesOff'
  | 'eyes'
  | 'closeCircle'
  | 'closeCircleo'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowLeft'
  | 'arrowRight'
  | 'calendar'
  | 'search'
  | 'alertTriangle'
  | 'plusCircleo'
  | 'camera'
  | 'image'
  | 'editAvatar'
  | 'dotsVertical'
  | 'menuFold';

export const AppIconNames: Record<AppIconNameType, VectorIconNameType> = {
  eyesOff: {feather: 'eye-off'},
  eyes: {feather: 'eye'},
  closeCircle: {antDesign: 'closecircle'},
  closeCircleo: {antDesign: 'closecircleo'},
  arrowDown: {feather: 'chevron-down'},
  arrowUp: {feather: 'chevron-up'},
  arrowLeft: {feather: 'chevron-left'},
  arrowRight: {feather: 'chevron-right'},
  calendar: {feather: 'calendar'},
  search: {feather: 'search'},
  alertTriangle: {feather: 'alert-triangle'},
  plusCircleo: {antDesign: 'pluscircleo'},
  camera: {feather: 'camera'},
  image: {feather: 'image'},
  editAvatar: {feather: 'edit'},
  dotsVertical: {materialCommunityIcons: 'dots-vertical'},
  menuFold: {antDesign: 'menufold'},
};
