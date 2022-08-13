import {Alert} from 'react-native';
// import {getUniqueId} from 'react-native-device-info';

import {Apis} from '../resource/apis';
import {AccountService} from './Account';
import {deviceType, CheckLogic, appKeys} from '../resource';
import {ResetFunction} from './ResetFunction';
import {LanguageService} from './Language';

let refreshResultQueuce;
const refreshToken = async () => {
  const account = AccountService.get();
  const Strings = LanguageService.get();
  console.log('refreshToken-account', account);
  const api = Apis.refreshAccessToken;
  // console.log('apiRefresh', api);
  const body = JSON.stringify({
    refresh_token: account?.refresh_token,
  });
  console.log('body', body);
  try {
    const response = await fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `${CheckLogic.Token_type[account.token_type]} ${
        //   account.token
        // }`,
      },
      body,
    });
    console.log('refreshToken', response);
    const res = await response.json();
    console.log('refreshToken', res.error);
    // console.log('refreshToken', res);
    if (response.status === 401) {
      return;
    }
    if (response.status === 200 || response.status === 201) {
      if (res.token) {
        AccountService.set(res);
        return res;
      } else if (res.status === 401) {
        //account deactive
        return;
      }
    }
    throw new Error(Strings.Forbiden);
  } catch (error) {
    console.log('error', error);
    return {error};
  }
};
const CommonCall = async (api, header) => {
  console.log('api', api);
  const Strings = LanguageService.get();
  // const networkState = await NetInfo.fetch();
  // if (!networkState.isConnected) {
  //   throw new Error(CheckLogic.No_internet);
  // }
  const account = AccountService.get();
  console.log('account', account);
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (header) {
      //overide Content-type
      headers = {
        ...headers,
        ...header.headers,
      };
    }
    if (account && account.token && !api.includes(Apis.login)) {
      headers = {
        ...headers,
        Authorization: `${CheckLogic.Token_type[account.token_type]} ${
          account.token
        }`,
      };
    }
    let head = {...header, headers};
    console.log('head', head);
    let response = await fetch(api, head);

    console.log('response', response);

    if (
      response.status === 500 ||
      response.status === 502 ||
      response.status === 504
    ) {
      throw new Error(Strings.Error_server);
    }
    let result = await response.json();
    if (account && account.token && response.status === 401) {
      console.log('test_invalid_token', result);
      if (
        (result?.error?.code === CheckLogic.Error_code.TOKEN_EXPIRED ||
          result?.error?.code === CheckLogic.Error_code.INVALID_TOKEN) &&
        (!`${api}`.includes(Apis.signUpInfo) ||
          !`${api}`.includes(Apis.passwordReset))
      ) {
        if (!refreshResultQueuce) {
          refreshResultQueuce = await refreshToken();
        }
        const resultRefresh = await refreshResultQueuce;
        if (resultRefresh === undefined) {
          refreshResultQueuce = undefined;
          ResetFunction.resetToLogin();
          // ToastService.set({message: Strings.Session_is_expired});
          Alert.alert(Strings.Confirmation, Strings.Session_is_expired);
          throw new Error(Strings.Account_deactive);
        }

        const currentToken = resultRefresh.token;
        console.log('currentToken?', currentToken);
        refreshResultQueuce = undefined;

        if (currentToken) {
          head = {
            ...header,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${
                CheckLogic.Token_type[account.token_type]
              } ${currentToken}`,
            },
          };
          console.log('head', head);

          response = await fetch(api, head);
          result = await response.json();
        }
      }
    }
    return result;
  } catch (error) {
    console.log('errorFetch', error);
    if (error.message === CheckLogic.No_internet) {
      throw new Error(Strings.Network_request_fail);
    }
    if (error.message === Strings.Error_server) {
      throw new Error(Strings.Error_server);
    }
    throw error;
  }
};
const FetchApi = {
  login: async data => {
    const Strings = LanguageService.get();
    console.log('data', data);
    try {
      const header = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const api = Apis.login;
      console.log('header', header);
      const response = await fetch(api, header);
      console.log('response', response);
      if (response.status >= 500) {
        throw new Error(Strings.Error_server);
      }
      const result = await response.json();
      console.log('result', result);
      if (result?.error) {
        if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
          // ToastService.set({message: Strings.Account_information_is_invalid});
          Alert.alert(
            Strings.Confirmation,
            Strings.Account_information_is_invalid,
            [{text: 'OK'}],
          );
        } else {
          // ToastService.set({message: result.error.message});
          Alert.alert(Strings.Confirmation, result.error.message, [
            {text: 'OK'},
          ]);
        }
      } else if (result.token) {
        //success
        if (data.password) {
          delete data.password;
        }
        AccountService.set({
          ...result,
          ...data,

          state: CheckLogic.Account_state.login,
        });
      }

      return result;
    } catch (error) {
      // ToastService.set({message: error.message});
      Alert.alert(Strings.Login, error.message, [{text: 'OK'}]);
      return {message: error.message};
    }
  },
  deviceToken: async ({deviceToken}) => {
    try {
      const data = {
        deviceToken,
        platform: deviceType,
      };
      const header = {
        method: 'POST',
        body: JSON.stringify(data),
      };
      const api = Apis.deviceToken;
      const result = await CommonCall(api, header);
      console.log('result', result);
      return result;
    } catch (error) {
      return {message: error.message};
    }
  },
  signupVerifyEmail: async data => {
    const Strings = LanguageService.get();
    const header = {
      method: 'POST',
      body: JSON.stringify(data),
      // body: data.email,
    };
    const api = Apis.authEmail;
    const result = await CommonCall(api, header, false);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Wrong_email_format});
        Alert.alert(Strings.Confirmation, Strings.Wrong_email_format);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Confirmation, result.error.message);
      }
    }
    console.log('result', result);

    return result;
  },
  signupWithInfo: async data => {
    const Strings = LanguageService.get();

    const dobConvert = `${data.dob.substring(0, 4)}-${data.dob.substring(
      4,
      6,
    )}-${data.dob.substring(6, 8)}`;
    const header = {
      method: 'POST',
      body: JSON.stringify({
        token: data.token,
        user_id: Number.parseInt(data.username, 10),
        date_of_birth: dobConvert,
        password: data.password,
        password_confirmation: data.password2,
      }),
    };
    const api = Apis.signUpInfo;
    const result = await CommonCall(api, header, false);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Please_check_your_input});
        Alert.alert(Strings.Confirmation, Strings.Please_check_your_input);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Confirmation, result.error.message);
      }
    }
    if (result.token) {
      //success
      AccountService.set({
        ...result,
        ...data,
        user_id: data.username,
        state: CheckLogic.Account_state.login,
      });
    }
    console.log('result', result);

    return result;
  },
  resetVerifyEmail: async data => {
    const Strings = LanguageService.get();
    console.log('data', data);
    const header = {
      method: 'POST',
      body: JSON.stringify(data),
      // body: data.email,
    };
    const api = Apis.passwordResetEmail;
    const result = await CommonCall(api, header, false);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Wrong_email_format});
        Alert.alert(Strings.Reset_pass, Strings.Wrong_email_format);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Reset_pass, result.error.message);
      }
    }
    console.log('result', result);

    return result;
  },
  updateUserInfo: async data => {
    const Strings = LanguageService.get();
    console.log('data', data);
    const header = {
      method: 'PUT',
      body: JSON.stringify(data),
    };
    const api = Apis.userInfo;
    const result = await CommonCall(api, header);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Wrong_email_format});
        Alert.alert(Strings.Change_email, Strings.Wrong_email_format, [
          {text: 'OK'},
        ]);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Change_email, result.error.message, [{text: 'OK'}]);
      }
    }
    if (result.email) {
      const info = AccountService.get();
      // info.userInfo = result;
      info.userInfo.email = result.email;

      AccountService.set({...info});
    }
    console.log('result', result);

    return result;
  },
  changePassword: async data => {
    const Strings = LanguageService.get();
    console.log('data', data);
    const header = {
      method: 'PUT',
      body: JSON.stringify({
        current_password: data.currentPassword,
        new_password: data.password,
        new_password_confirmation: data.password2,
      }),
    };
    const api = Apis.changePassword;
    const result = await CommonCall(api, header);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Wrong_email_format});
        Alert.alert(Strings.Change_password, Strings.Please_check_your_input);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Change_password, result.error.message);
      }
    }

    return result;
  },
  userInfo: async () => {
    const header = {
      method: 'GET',
    };
    const api = Apis.userInfo;
    const result = await CommonCall(api, header);
    // if (result?.error) {
    //   if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
    //     ToastService.set({message: Strings.Please_check_your_input});
    //   } else {
    //     ToastService.set({message: result.error.message});
    //   }
    // }
    console.log('result', result);

    return result;
  },

  resetPass: async data => {
    const Strings = LanguageService.get();
    const header = {
      method: 'PUT',
      body: JSON.stringify({
        token: data.token,
        password: data.password,
        password_confirmation: data.password2,
      }),
    };
    const api = Apis.passwordReset;
    const result = await CommonCall(api, header);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Please_check_your_input});
        Alert.alert(Strings.Reset_pass, Strings.Please_check_your_input, [
          {text: 'OK'},
        ]);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Reset_pass, result.error.message, [{text: 'OK'}]);
      }
    }
    // //success
    // if (result.token) {
    //   AccountService.set({
    //     ...result,
    //     password: data.password,
    //     state: CheckLogic.Account_state.login,
    //   });
    // }
    console.log('result', result);

    return result;
  },

  logout: async data => {
    const body = {
      token: data.token,
    };
    const Strings = LanguageService.get();
    const header = {
      method: 'POST',
      body: JSON.stringify(body),
      // body: data.email,
    };
    const api = Apis.logout;
    const result = await CommonCall(api, header);
    if (result?.error) {
      // if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
      //   ToastService.set({message: Strings.Wrong_email_format});
      // } else {
      //   ToastService.set({message: result.error.message});
      // }
    }
    console.log('result', result);

    return result;
  },

  videosList: async data => {
    const Strings = LanguageService.get();
    const header = {
      method: 'GET',
    };
    const api = Apis.videosList;
    const result = await CommonCall(api, header);
    // if (result?.error) {
    //   if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
    //     ToastService.set({message: Strings.Please_check_your_input});
    //   } else {
    //     ToastService.set({message: result.error.message});
    //   }
    // }
    console.log('result', result);

    return result;
  },
  videoDetail: id => async () => {
    const Strings = LanguageService.get();
    const header = {
      method: 'GET',
    };
    const api = Apis.videoDetail(id);
    const result = await CommonCall(api, header);
    // if (result?.error) {
    //   if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
    //     ToastService.set({message: Strings.Please_check_your_input});
    //   } else {
    //     ToastService.set({message: result.error.message});
    //   }
    // }
    console.log('result', result);

    return result;
  },
  homeworks: async () => {
    const Strings = LanguageService.get();
    const header = {
      method: 'GET',
    };
    const api = Apis.homeworks;
    const result = await CommonCall(api, header);
    // if (result?.error) {
    //   if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
    //     ToastService.set({message: Strings.Please_check_your_input});
    //   } else {
    //     ToastService.set({message: result.error.message});
    //   }
    // }
    console.log('result', result);

    return result;
  },

  postingReview: async data => {
    const Strings = LanguageService.get();
    const header = {
      method: 'POST',
      body: JSON.stringify(data.review),
      // body: data.email,
    };
    const api = Apis.postingReview(data.videoId);
    const result = await CommonCall(api, header);
    if (result?.error) {
      if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
        // ToastService.set({message: Strings.Wrong_email_format});
        Alert.alert(Strings.Confirmation, Strings.Please_check_your_input);
      } else {
        // ToastService.set({message: result.error.message});
        Alert.alert(Strings.Confirmation, result.error.message);
      }
    }
    console.log('result', result);

    return result;
  },

  videoThumbnail: async vimeo_id => {
    try {
      const api = Apis.vimeoThumbnail(vimeo_id);
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Referer: appKeys.vimeoReferer,
        },
      });
      let result;
      if (response.status === 200) {
        result = await response.json();
      }
      console.log('result', result);
      // if (result?.error) {
      //   if (result.error.code === CheckLogic.Error_code.INVALID_PARAMETERS) {
      //     // ToastService.set({message: Strings.Account_information_is_invalid});
      //     Alert.alert(
      //       Strings.Confirmation,
      //       Strings.Account_information_is_invalid,
      //       [{text: 'OK'}],
      //     );
      //   } else {
      //     // ToastService.set({message: result.error.message});
      //     Alert.alert(Strings.Confirmation, result.error.message, [
      //       {text: 'OK'},
      //     ]);
      //   }
      // }

      return result;
    } catch (error) {
      // // ToastService.set({message: error.message});
      // Alert.alert(Strings.Login, error.message, [{text: 'OK'}]);
      // return {message: error.message};
    }
  },
};
export {FetchApi};
