import React from 'react';
import {View} from 'react-native';

import {
  AppButtonNormal,
  AppContainer,
  AppModal,
  AppModalSerivce,
} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';

const _space = <View style={{height: 20}} />;

export const Playground = () => {
  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      <AppButtonNormal
        containerStyle={CommonStyles.solidButtonContainer}
        label={'Show Modal'}
        onPress={() =>
          AppModalSerivce.onOpenModal({
            children: (
              <AppButtonNormal
                containerStyle={[
                  CommonStyles.solidButtonContainer,
                  {marginHorizontal: Sizes.padding * 4},
                ]}
                label={'Hide Modal'}
                onPress={() => AppModalSerivce.onCloseModal()}
              />
            ),
          })
        }
      />
      <AppModal />
    </AppContainer>
  );
};
