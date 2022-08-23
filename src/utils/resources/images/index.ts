export type ResourceImageNameType = 'app_logo' | 'default_avatar';

export const getResourceImage = (name: ResourceImageNameType) => {
  switch (name) {
    case 'app_logo':
      return require('./app_logo.png');
    case 'default_avatar':
  }
};

export const Images = {
  get appLogo() {
    return require('./app_logo.png');
  },
  get defaultAvatar() {
    return require('./default_avatar.png');
  },
};
