import {Alert} from 'react-native';

import {Apis, Constants} from '../resources';

import {AppAccount} from './Account';
import {_resetToLogin} from './Navigation';

/**
 * To advoid duplicated refresh token
 */
let refreshTokenQueue;
/**
 * Refesh token routine
 */
async function refreshToken() {
  const account = AppAccount.get();
  const api = Apis.refreshAccessToken;

  const header = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: account?.refresh_token,
    }),
  };

  try {
    const response = await fetch(api, header);
    console.log('refreshToken-header', header);
    console.log('refreshToken-response', response);

    const result = await response.json();
    console.log('refreshToken-result', result);
    if (!(response.status === 200 || response.status === 201)) {
      throw new Error(Constants.SESSION_EXPIRED);
    }

    if (result.status === 401 || !result?.token) {
      throw new Error(Constants.ACCOUNT_DEACTIVATE);
    }

    AppAccount.set(result);
    refreshTokenQueue = undefined;
    return result;
  } catch (error) {
    _resetToLogin();
    refreshTokenQueue = undefined;
    throw error;
  }
}

/**
 *
 * @param {*} url restful api
 * @param {*} header http request header includes method, body, headers
 * @param {*} option used to control commonCall flow
 * @returns
 */
const commonCall = async (url, header, option) => {
  // To handle all cases by changing option
  const {withToken = true, withRefreshToken = true} = option;
  const account = AppAccount.get();

  try {
    const headers = {
      'Content-Type': 'application/json',
      ...header?.headers,
    };

    // If use access token
    withToken && (headers.Authorization = `Bearer ${account.token}`);

    const _header = {...header, headers};
    let response = await fetch(url, _header);
    let result = await response.json();
    console.log('_header', header);
    console.log('response', response);
    console.log('result', result);

    // If refresh token
    if (
      response.status === 401 &&
      (result?.error?.code === Constants.INVALID_TOKEN ||
        result?.error?.code === Constants.TOKEN_EXPIRED) &&
      withRefreshToken
    ) {
      if (!refreshTokenQueue) {
        refreshTokenQueue = refreshToken();
      }
      const refreshTokenResult = await refreshTokenQueue;
      const newToken = await refreshTokenResult?.access_token;

      // To refetch api
      _header.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, _header);
      result = await response.json();
      console.log('refetchResponse', response);
      console.log('refetchResult', result);
    }

    if (
      response.status === 500 ||
      response.status === 502 ||
      response.status === 504
    ) {
      throw new Error(Constants.SERVER_ERROR);
    }

    return result;
  } catch (error) {
    console.log('commonCall-error', error);
    throw error;
  }
};
const handleCommonCallException = (error, Strings, title = null) => {
  switch (error?.message) {
    case Constants.NETWORK_REQUEST_FAILED:
      Alert.alert(title, Strings.networkRequestFailed);
      break;
    case Constants.SERVER_ERROR:
      Alert.alert(title, Strings.serverError);
      break;
    default:
      Alert.alert(title, Strings.somethingWrong);
      break;
  }
  return;
};

const authOption = {
  withToken: false,
  withRereshToken: false,
};

export {commonCall, authOption, handleCommonCallException};
