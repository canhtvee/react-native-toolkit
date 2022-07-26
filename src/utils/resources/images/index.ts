export type ResourceImageNameType = 'app_logo' | 'default_avatar';

export const getResourceImage = (name: ResourceImageNameType) => {
  switch (name) {
    case 'app_logo':
      return require('./app_logo.png');
    case 'default_avatar':
      return require('./default_avatar.png');
  }
};
