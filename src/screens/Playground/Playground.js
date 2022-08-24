import React from 'react';
import {Text, View} from 'react-native';
import {
  AppButtonNormal,
  AppContainer,
  AppIcon,
  AppViewLoading,
  VectorIcon,
} from '../../commons';
import {Sizes, useRoutine} from '../../utils';

const _space = <View style={{height: 20}} />;

// initial state of the database
const initialState = {count: 0};

// API logic: how to update the database when the
// 'increment' API endpoint is called
const reducer = (state, action) => {
  if (action.type === 'increment') {
    return {count: state.count + action.payload};
  }
  if (action.type === 'decrement') {
    return {count: state.count - action.payload};
  }
};

export const Playground = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log('state', state);

  return (
    <AppContainer edges="lrtb">
      <View
        style={{flex: 1, backgroundColor: 'lightblue'}}
        onLayout={event => console.log(event.nativeEvent.layout)}>
        {_space}

        {_space}
        <AppIcon
          name={{feather: 'chevron-left'}}
          size={Sizes.wpx(36)}
          onPress={() => {}}
          iconContainerStyle={{alignSelf: 'flex-start'}}
        />

        <AppButtonNormal
          label={'Run Animation'}
          containerStyle={[{marginHorizontal: Sizes.padding * 2}]}
          onPress={() => dispatch({type: 'decrement', payload: 10})}
        />
      </View>
    </AppContainer>
  );
};

const fetchData = async () => {
  return new Promise(resolver =>
    setTimeout(() => resolver({data: [], status: 'OK'}), 2000),
  );
};

function Children() {
  console.log('render Chidren');
  return <Text>Children</Text>;
}
