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

function useAppSession() {
  const [session, setSession] = React.useState();

  React.useEffect(() => {}, []);
}

export {useAppSession, AppAccount};
