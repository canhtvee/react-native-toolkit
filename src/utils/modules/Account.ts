import React from 'react';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

const TAG = 'account';

const mmkvId = `mmkv-${TAG}`;
const mmkvKey = `key-${TAG}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const AppAccount = {
  get: () => MMKVwithID.getMap(mmkvKey),
  set: (value: any) => {
    if (!value) {
      return MMKVwithID.setMap(mmkvKey, {});
    }

    const _value = MMKVwithID.getMap(mmkvKey);

    const _newValue = {
      ..._value,
      ...value,
    };

    MMKVwithID.setMap(mmkvKey, _newValue);
  },
};

function useAppAccount() {
  const [value, setValue] = useMMKVStorage(mmkvKey, MMKVwithID);

  let account = MMKVwithID.getMap(mmkvKey);

  if (value) {
    account = value;
  }
  return {account, setValue};
}

export {useAppAccount, AppAccount};
