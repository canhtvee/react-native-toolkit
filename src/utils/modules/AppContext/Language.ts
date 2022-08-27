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

const LanguagueService = {
  setCode: (code: LanguageCodeType) => MMKVwithID.setString(mmkvKey, code),
  getCode: (): LanguageCodeType =>
    (MMKVwithID.getString(mmkvKey) || 'english') as LanguageCodeType,
  getStrings: () => {
    const code = MMKVwithID.getString(mmkvKey) as LanguageCodeType;
    const Strings = getResourceStrings(code || 'english');
    return Strings as StringsType;
  },
};

function useLanguage() {
  const [code, setCode] = useMMKVStorage<LanguageCodeType>(mmkvKey, MMKVwithID);

  const Strings = getResourceStrings(code || 'english') as StringsType;

  return {Strings, setLanguageCode: setCode};
}
export {useLanguage, LanguagueService};
