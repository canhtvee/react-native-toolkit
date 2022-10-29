import React from 'react';

import {
  ColorsType,
  LanguageCodeType,
  StringsType,
  ThemCodeType,
} from '../../resources';

import {useLanguage} from './Language';
import {useTheme} from './Theme';

type AppContextType = {
  Colors: ColorsType;
  Strings: StringsType;
  setLanguageCode: (
    value:
      | LanguageCodeType
      | ((prevValue: LanguageCodeType) => LanguageCodeType),
  ) => void;
  setThemeCode: (
    value: ThemCodeType | ((prevValue: ThemCodeType) => ThemCodeType),
  ) => void;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

function AppContextProvider({children}: {children: React.ReactNode}) {
  const {Colors, setThemeCode} = useTheme();
  const {Strings, setLanguageCode} = useLanguage();

  return (
    <AppContext.Provider
      value={{Colors, Strings, setLanguageCode, setThemeCode}}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useAppContext should be invoked inside AppContextProvider's childrens",
    );
  }

  return context;
}

export {useAppContext, AppContextProvider};
