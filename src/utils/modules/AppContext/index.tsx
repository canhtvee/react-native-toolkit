import React from 'react';

import {ColorsType, LanguageCodeType, StringsType} from '../../resources';

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
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({children}: {children: React.ReactNode}) {
  const {Colors} = useTheme();
  const {Strings, setLanguageCode} = useLanguage();

  return (
    <AppContext.Provider value={{Colors, Strings, setLanguageCode}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error(
      "useAppContext should be invoked inside AppContextProvider's childrens",
    );
  }

  return context;
}
