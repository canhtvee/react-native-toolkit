import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Sizes} from '@utils';

import {AppText} from '../appText';
import {useReleaseInfo} from './useReleaseInfo';

export function AppVersion() {
  const releaseInfo = useReleaseInfo();
  const insets = useSafeAreaInsets();

  if (!releaseInfo) {
    return null;
  }

  let _appVersion = releaseInfo.appVersion;
  releaseInfo?.buildVersion && (_appVersion += `(${releaseInfo.buildVersion})`);
  releaseInfo?.label && (_appVersion += `(${releaseInfo.label})`);

  return (
    <AppText
      style={{
        alignSelf: 'center',
        marginBottom: Math.max(insets.bottom, Sizes.padding),
      }}>
      {'version: '}
      {_appVersion}
    </AppText>
  );
}
