import {Constants} from '../../helpers';
import {AccountService} from '../Account';
import {Apis} from './apis';

async function AuthCall(api, header) {
  try {
    let _headers = {
      'Content-Type': 'application/json',
    };
    if (header) {
      // Overide Content-type
      _headers = {
        ..._headers,
        ...header?.headers,
      };
    }

    let _header = {...header, _headers};
    console.log('header', _header);

    const response = await fetch(api, _header);
    console.log('response', response);

    if (
      response.status === 500 ||
      response.status === 502 ||
      response.status === 504
    ) {
      throw new Error(Constants.HTTP_MESSAGE.SERVER_ERROR);
    }

    const result = await response.json();
    console.log('result', result);

    return result;
  } catch (error) {
    return error;
  }
}

// Authentification and Authorization service
export const AuthService = {
  signUpEmail: async data => {
    const api = Apis.authEmail;

    const header = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    const result = await AuthCall(api, header, false);

    return result;
  },

  signUpWithInfo: async data => {
    const api = Apis.signUpInfo;

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
    const result = await AuthCall(api, header, false);

    return result;
  },

  login: async data => {
    const api = Apis.login;

    const header = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    const result = await AuthCall(api, header);
    return result;
  },

  refreshToken: async () => {
    const api = Apis.refreshAccessToken;
    const account = AccountService.get();

    const header = {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: account?.refresh_token,
      }),
    };

    const result = AuthCall(api, header);
    return result;
  },
  // End of AuthService
};
