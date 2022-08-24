const StringsEnglish = {
  menu: 'Menu',
  confirm: 'Confirm',
  cancel: 'Cancel',
  ok: 'Ok',
  successful: 'Successful',
  gallery: 'Gallery',
  camera: 'Camera',
  session_satus: 'Session Status',
  session_expired: 'Session is expired, please login again!',
};
const StringsVietnamese = {};

export type LanguageCodeType = 'vietnamese' | 'english';

const getResourceStrings = (code: LanguageCodeType) => {
  switch (code) {
    case 'vietnamese':
      return StringsVietnamese;
    case 'english':
      return StringsEnglish;
    default:
      if (__DEV__) {
        throw new Error('Invalid language code');
      }
      return null;
  }
};

export type StringsType = typeof StringsEnglish;

export {getResourceStrings};
