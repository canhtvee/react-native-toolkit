import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const tag = 'account';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const AccountService = {
  get: () => MMKVwithID.getMap(mmkvKey),
  set: (value = {}) => MMKVwithID.setMap(mmkvKey, value),
};

function useAppAccount() {
  const [account, setAccount] = useMMKVStorage(mmkvKey, MMKVwithID);

  return {account, setAccount};
}
export {useAppAccount, AccountService};
