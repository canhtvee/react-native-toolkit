import React from 'react';
import {useAppLanguage} from './Language';
import {useAppTheme} from './Theme';
import {
  ColorsType,
  getResourceStyles,
  LanguageCodeType,
  StringsType,
  StylesType,
} from '../../resources';

type AppContextType = {
  Colors: ColorsType;
  Strings: StringsType;
  Styles: StylesType;
  setLanguageCode: (
    value:
      | LanguageCodeType
      | ((prevValue: LanguageCodeType) => LanguageCodeType),
  ) => void;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({children}: {children: React.ReactNode}) {
  const {Colors} = useAppTheme();
  const {Strings, setLanguageCode} = useAppLanguage();

  const Styles = getResourceStyles(Colors);

  return (
    <AppContext.Provider value={{Colors, Strings, setLanguageCode, Styles}}>
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
