import {Constants, ResetFunction} from '../../helpers';
import {AccountService} from '../Account';
import {NavigationService} from '../Navigation';

import {Apis} from './apis';
import {AuthService} from './AuthService';

const stack = {requestRefreshToken: false};

async function CommonCall(url, header) {
  const account = AccountService.get();

  try {
    let _headers = {
      'Content-Type': 'application/json',
    };
    if (header) {
      // Overide Content-type
      _headers = {
        ..._headers,
        ...header?.headers,
        Authorization: `Bearer ${account.token}`,
      };
    }

    let _header = {...header, _headers};
    console.log('_header', header);

    const response = await fetch(url, _header);
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

    // If refresh token
    if (
      response.status === 401 &&
      account?.token &&
      (result?.error?.code === Constants.HTTP_CODE.INVALID_TOKEN ||
        result?.error?.code === Constants.HTTP_CODE.TOKEN_EXPIRED) &&
      !stack.requestTokenQueue
    ) {
      stack.requestRefreshToken = true;
      const refreshTokenResult = await AuthService.refreshToken();

      if (!refreshTokenResult?.token) {
        ResetFunction.resetToLogin();
        stack.requestRefreshToken = false;
        throw new Error(Constants.HTTP_MESSAGE.SESSION_EXPIRED);
      }

      AccountService.set(refreshTokenResult);
      stack.requestRefreshToken = false;

      // To refetch api
      _header.Authorization = `Bearer ${refreshTokenResult.token}`;
      const refetchResponse = await fetch(url, _header);

      console.log('refetchResponse', refetchResponse);

      if (
        refetchResponse.status === 500 ||
        refetchResponse.status === 502 ||
        refetchResponse.status === 504
      ) {
        throw new Error(Constants.HTTP_MESSAGE.SERVER_ERROR);
      }

      const refetchResult = await refetchResponse.json();
      console.log('refetchResult', refetchResult);

      return refetchResult;
    }

    return result;
  } catch (error) {
    return error;
  }
}

export const FetchApi = {
  uploadFile: async args => {
    console.log('start upload');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({data: 'upload done'});

        console.log(' upload finished');
      }, 2000);
    });
  },
  getVideos: async () => {
    try {
      NavigationService.navigate('AppIntro');
      throw new Error('Session is expired');
    } catch (error) {
      return error;
    }
  },
};
