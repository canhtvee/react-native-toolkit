export const Constants = {
  STATUS: {
    LOADING: 'LOADING',
    SUCCESSFUL: 'SUCCESSFUL',
    ERROR: 'ERROR',
    IDLE: 'IDLE',
  },
  HTTP_CODE: {
    INVALID_PARAMETERS: 'INVALID_PARAMETERS',
    INVALID_TOKEN: 'INVALID_TOKEN',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  },
  HTTP_MESSAGE: {
    SERVER_ERROR: 'Server is maintaining\n Please try again later!',
    NETWORK_ERROR:
      'Network is not connected\n Please check your internet connection!',
    SESSION_EXPIRED: 'Session is expired, please login again!',
  },
};
