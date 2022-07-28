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
    return;
  },
  getCode: (): ThemCodeType =>
    (MMKVwithID.getString(`${mmkvKey}`) || 'system-default') as ThemCodeType,
};

const _convertCodeToTheme = (code: ThemCodeType) => {
  if (code === 'system-default') {
    const scheme = Appearance.getColorScheme() || 'light';
    return scheme;
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

function useAppTheme() {
  const [code] = useMMKVStorage<ThemCodeType>(mmkvKey, MMKVwithID);
  const [currentTheme, setCurrentTheme] = useState(() =>
    _convertCodeToTheme(code || 'system-default'),
  );
  const themeRef = useRef<any>();

  useEffect(() => {
    if (themeRef.current && typeof themeRef.current === 'function') {
      themeRef.current();
    }

    // To listen to scheme if code ==='system-default'
    if (!code || code === 'system-default') {
      const listener = () => {
        setCurrentTheme(_convertCodeToTheme('system-default'));
      };
      themeRef.current = Appearance.addChangeListener(listener);
    } else {
      setCurrentTheme(_convertCodeToTheme(code));
    }

    return () => {
      if (themeRef.current && typeof themeRef.current === 'function') {
        themeRef.current();
      }
    };
  }, [code]);

  const Colors = getResourceColors(currentTheme) as ColorsType;
  return {Colors};
}
export {useAppTheme, ThemeService};
