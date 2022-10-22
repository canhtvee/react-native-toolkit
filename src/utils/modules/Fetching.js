import {Alert} from 'react-native';

import {Apis, Constants} from '../resources';

import {AppAccount} from './Account';
import {_resetToLogin} from './Navigation';

/**
 * To advoid duplicated refresh token
 */
const RequestQueue = {
  refreshToken: undefined,
};

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

  const response = await fetch(api, header);
  console.log('refreshToken-header', header);
  console.log('refreshToken-response', response);

  const result = await response.json();
  console.log('refreshToken-result', result);
  if (response.status === 200 || (response.status === 201 && result?.token)) {
    AppAccount.set(result);
    return result;
  }

  _resetToLogin();
  throw new Error(Constants.http.SESSION_EXPIRED);
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
      withRefreshToken &&
      !RequestQueue.refreshToken &&
      response.status === 401 &&
      (result?.error?.code === Constants.http_code.INVALID_TOKEN ||
        result?.error?.code === Constants.http_code.TOKEN_EXPIRED)
    ) {
      RequestQueue.refreshToken = await refreshToken();

      const newToken = RequestQueue.refreshToken?.access_token;
      RequestQueue.refreshToken = undefined;

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
      throw new Error(Constants.http.SERVER_ERROR);
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
    case Constants.SESSION_EXPIRED:
      Alert.alert(title, Strings.sessionExpired);
      break;
    default:
      Alert.alert(title, Strings.somethingWrong);
      break;
  }
};

const authOption = {
  withToken: false,
  withRereshToken: false,
};

export {commonCall, authOption, handleCommonCallException};
