import {get} from 'react-hook-form';

export const Constants = {
  status: {
    LOADING: 1,
    SUCCESSFUL: 2,
    ERROR: 3,
    IDLE: 4,
  },
  http: {
    INVALID_PARAMETERS: 'INVALID_PARAMETERS',
    INVALID_TOKEN: 'INVALID_TOKEN',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    SERVER_ERROR: 'SERVER_ERROR',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    NETWORK_REQUEST_FAILED: 'Network request failed',
    NETWORK_ERROR: 'NETWORK_ERROR',
  },
};

get;
