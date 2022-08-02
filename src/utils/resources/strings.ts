const StringsEnglish = {
  menu: 'Menu',
  confirm: 'Confirm',
  cancel: 'Cancel',
  ok: 'Ok',
  successful: 'Successful',
};
const StringsVietnamese = {
  AppIntro_next: 'Next',
  App_name: 'base',
  Menu: 'Menu',
  Language: 'Ngôn ngữ',
  Mode: 'Chế độ',
  User_feedback: 'Phản hồi ứng dụng',
  About_us: 'About us',
  Current_version: 'Phiên bản hiện tại',
  English: 'English',
  Japanese: '日本語',
  Vietnamese: 'Tiếng Việt',
  Light_mode: 'Chế độ ban ngày',
  Dark_mode: 'Chế độ ban đêm',
  Base_device: 'Dựa theo điện thoại của bạn.',
  Now: 'Vừa xong',
  Bookmark: 'Yêu thích',
  Settings: 'Cài đặt',
  Login: 'Đăng nhập',
  Home: 'Trang chủ',
  Vietnamese_code: 'Vietnamese_code',
};

export type LanguageCodeType = 'vietnamese' | 'english';

const getResourceStrings = (code: LanguageCodeType) => {
  switch (code) {
    case 'vietnamese':
      return StringsVietnamese;
    case 'english':
      return StringsEnglish;
  }
};

// export type StringsType = ReturnType<typeof getResourceStrings>;
export type StringsType = typeof StringsEnglish;

export {getResourceStrings, StringsEnglish, StringsVietnamese};
