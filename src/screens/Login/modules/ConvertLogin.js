import {LanguageService} from '../../../utils';

const ConvertLogin = {
  validate: {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  account: loginResult => {
    return {
      ...loginResult.user,
      ...loginResult.loginResult,
    };
  },
};
export {ConvertLogin};
