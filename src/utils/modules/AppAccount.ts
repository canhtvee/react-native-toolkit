import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const TAG = 'account';

const mmkvId = `mmkv-${TAG}`;
const mmkvKey = `key-${TAG}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const AppAccount = {
  get: () => MMKVwithID.getMap(mmkvKey),
  set: (value = {}) => MMKVwithID.setMap(mmkvKey, value),
  sessionStatus: {
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

export {useAppAccount, AppAccount};
