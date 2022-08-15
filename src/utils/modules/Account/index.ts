import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const tag = 'account';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const AccountService = {
  get: () => MMKVwithID.getMap(mmkvKey),
  set: (value = {}) => MMKVwithID.setMap(mmkvKey, value),
  SESSION_STATUS: {
    LOGIN: 1,
    NOT_REGISTERED: 2,
    EXPIRED: 3,
    LOGOUT: 4,
  },
};

function useAppAccount() {
  const [account, setAccount] = useMMKVStorage(mmkvKey, MMKVwithID);

  return {account, setAccount};
}

function useAppSession() {}

export {useAppAccount, useAppSession, AccountService};
