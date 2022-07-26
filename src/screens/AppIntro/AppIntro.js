import React from 'react';
import {AppContainer, AppText, LibsPlayground} from '../../libs';

export function AppIntro() {
  return (
    <AppContainer style={{alignItems: 'center', justifyContent: 'center'}}>
      <AppText>AppIntro</AppText>
      <LibsPlayground />
    </AppContainer>
  );
}
