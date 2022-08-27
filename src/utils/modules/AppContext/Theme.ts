import {useEffect, useRef, useState} from 'react';
import {Appearance} from 'react-native';
import MMKVStorage, {useMMKVStorage} from 'react-native-mmkv-storage';

import {ColorsType, getResourceColors, ThemCodeType} from '../../resources';

const tag = 'theme';

const mmkvId = `mmkv-${tag}`;
const mmkvKey = `key-${tag}`;

const MMKVwithID = new MMKVStorage.Loader().withInstanceID(mmkvId).initialize();

const ThemeService = {
  setCode: (code: ThemCodeType) => {
    MMKVwithID.setString(`${mmkvKey}`, code);
  },
  getCode: (): ThemCodeType =>
    (MMKVwithID.getString(`${mmkvKey}`) || 'system-default') as ThemCodeType,
};

const __convertCodeToTheme = (code: ThemCodeType) => {
  if (code === 'system-default') {
    return Appearance.getColorScheme() || 'light';
  }
  return code;
};

// const _onUpdateTheme = (
//   code: ThemCodeType,
//   setCurrentTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
// ) => {
//   const convertTheme = _convertCodeToTheme(code);
//   setCurrentTheme(prev => {
//     if (prev === convertTheme) {
//       return prev;
//     } else {
//       return convertTheme;
//     }
//   });
// };

function useTheme() {
  const [code, setCode] = useMMKVStorage<ThemCodeType>(mmkvKey, MMKVwithID);
  const [currentTheme, setCurrentTheme] = useState(() =>
    __convertCodeToTheme(code || 'system-default'),
  );
  const themeRef = useRef<any>();

  useEffect(() => {
    if (themeRef.current && typeof themeRef.current === 'function') {
      themeRef.current();
    }

    // To listen to scheme if code ==='system-default'
    if (!code || code === 'system-default') {
      const listener = () => {
        setCurrentTheme(__convertCodeToTheme('system-default'));
      };
      themeRef.current = Appearance.addChangeListener(listener);
    } else {
      setCurrentTheme(__convertCodeToTheme(code));
    }

    return () => {
      if (themeRef.current && typeof themeRef.current === 'function') {
        themeRef.current();
      }
    };
  }, [code]);

  const Colors = getResourceColors(currentTheme) as ColorsType;

  return {Colors, setThemeCode: setCode};
}
export {useTheme, ThemeService};
