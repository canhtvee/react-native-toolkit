import {Alert} from 'react-native';

import {Apis, Constants} from '../resources';

import {AppAccount} from './AppAccount';
import {_resetToLogin} from './ResetFunction';

/**
 * To advoid duplicated refresh token
 */
const RequestQueue = {
  refreshToken: undefined,
};

/**
 * Utils function
 */
const __checkHttpErrors = response => {
  if (
    response.status === 500 ||
    response.status === 502 ||
    response.status === 504
  ) {
    throw new Error(Constants.http.SERVER_ERROR);
  }
};

/**
 * Refesh token routine
 */
async function __refreshToken() {
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
    return result;
  }

  _resetToLogin();
  RequestQueue.refreshToken = false;
  throw new Error(Constants.http.SESSION_EXPIRED);
}

export const AppFetch = {
  /**
   *
   * @param {*} url restful api
   * @param {*} header http request header includes method, body, headers
   * @param {*} option used to control commonCall flow
   * @returns
   */
  comonCall: async (url, header, option) => {
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
      const response = await fetch(url, _header);
      console.log('_header', header);
      console.log('response', response);

      __checkHttpErrors(response);

      const result = await response.json();
      console.log('result', result);

      // If refresh token
      if (
        withRefreshToken &&
        !RequestQueue.refreshToken &&
        response.status === 401 &&
        (result?.error?.code === Constants.http_code.INVALID_TOKEN ||
          result?.error?.code === Constants.http_code.TOKEN_EXPIRED)
      ) {
        RequestQueue.refreshToken = true;
        const refreshTokenResult = await __refreshToken();

        AppAccount.set(refreshTokenResult);
        RequestQueue.refreshToken = false;

        // To refetch api
        _header.Authorization = `Bearer ${refreshTokenResult.token}`;
        const refetchResponse = await fetch(url, _header);

        console.log('refetchResponse', refetchResponse);
        console.log('refetchResponse', refetchResponse);

        __checkHttpErrors(refetchResponse);

        const refetchResult = await refetchResponse.json();
        console.log('refetchResult', refetchResult);

        return refetchResult;
      }
      return result;
    } catch (error) {
      console.log('commonCall-error', error);
      throw error;
    }
  },
  handleException: (error, Strings, title = null) => {
    switch (error?.message) {
      case Constants.http.NETWORK_REQUEST_FAILED:
        Alert.alert(title, Strings.networkRequestFailed);
        break;
      case Constants.http.SERVER_ERROR:
        Alert.alert(title, Strings.serverError);
        break;
      case Constants.http.SESSION_EXPIRED:
        Alert.alert(title, Strings.sessionExpired);
        break;
      default:
        Alert.alert(title, Strings.somethingWrong);
        break;
    }
  },
};
