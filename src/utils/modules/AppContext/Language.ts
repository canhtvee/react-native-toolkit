import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';
import {
  getResourceStrings,
  LanguageCodeType,
  StringsType,
} from '../../resources';

const tag = 'language-code';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const LanguageService = {
  setCode: (code: LanguageCodeType) => MMKVwithID.setString(mmkvKey, code),
  getCode: (): LanguageCodeType =>
    (MMKVwithID.getString(mmkvKey) || 'english') as LanguageCodeType,
  get: () => {
    const code = MMKVwithID.getString(mmkvKey) as LanguageCodeType;
    const Strings = getResourceStrings(code || 'english');
    return Strings as StringsType;
  },
};

function useAppLanguage() {
  const [code, setCode] = useMMKVStorage<LanguageCodeType>(mmkvKey, MMKVwithID);

  let Strings = getResourceStrings(code || 'english') as StringsType;

  return {Strings, setLanguageCode: setCode};
}
export {useAppLanguage, LanguageService};
