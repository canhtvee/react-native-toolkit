import React from 'react';
import {View} from 'react-native';

import {
  AppButtonNormal,
  AppContainer,
  AppModal,
  AppModalService,
} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';

const _space = <View style={{height: 20}} />;

export const Playground = () => {
  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      <AppButtonNormal
        containerStyle={CommonStyles.solidButtonContainer}
        label={'Show Modal'}
        onPress={() => {
          AppModalService.onChange({
            eventName: 'requestOpenModal',
            data: {
              children: (
                <View
                  style={{
                    minHeight: 200,
                    minWidth: 200,
                    borderRadius: 8,
                    backgroundColor: 'white',
                    marginHorizontal: Sizes.padding * 3,
                    padding: Sizes.padding,
                    justifyContent: 'center',
                  }}>
                  <AppButtonNormal
                    containerStyle={CommonStyles.solidButtonContainer}
                    label={'Close Modal'}
                    onPress={() =>
                      AppModalService.onChange({eventName: 'requestCloseModal'})
                    }
                  />
                </View>
              ),
            },
          });
        }}
      />
      <AppModal />
    </AppContainer>
  );
};
