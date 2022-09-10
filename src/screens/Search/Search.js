import React from 'react';
import {Button, Text, View} from 'react-native';
import {AppContainer, AppSearchInput} from '../../commons';
import {Sizes, useAppContext} from '../../utils';

export function Search({navigation}) {
  const {Colors} = useAppContext();
  return (
    <View style={{paddingTop: Sizes.padding, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.padding,
          alignItems: 'center',
        }}>
        <AppSearchInput
          containerStyle={{
            width: Sizes.width(75),
            backgroundColor: Colors.hover,
            borderWidth: 0,
          }}
        />

        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
      <AppContainer edges="lrb" style={{flex: 1}}>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
        <Text style={{height: 40, textAlign: 'center'}}> Search</Text>
      </AppContainer>
    </View>
  );
}
