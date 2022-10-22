const StringsEnglish = {
  menu: 'Menu',
  confirm: 'Confirm',
  cancel: 'Cancel',
  ok: 'Ok',
  successful: 'Successful',
  gallery: 'Gallery',
  camera: 'Camera',
  sessionStatus: 'Session Status',
  sessionExpired: 'Session is expired \nPlease login again to use services!',
  networkRequestFailed: 'Network resquest failed!',
  serverError: 'Server is maintaining \nPlease try again later!',
  somethingWrong: 'Something wrong \nPlease try again later!',
  search: 'Search...',
  emptyContent: 'There is no content to display',
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
