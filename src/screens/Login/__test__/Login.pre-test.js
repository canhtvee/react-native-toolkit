// // import 'react-native';
// // import 'react-native-gesture-handler/jestSetup';
// import React from 'react';
// import {
//   fireEvent,
//   render,
//   waitFor,
//   waitForElementToBeRemoved,
// } from '@testing-library/react-native';

// const mockedDispatch = jest.fn();
// const mockedNavigate = jest.fn();

// jest.mock('react-native-reanimated', () => {
//   const Reanimated = require('react-native-reanimated/mock');

//   // The mock for `call` immediately calls the callback which is incorrect
//   // So we override it with a no-op
//   Reanimated.default.call = () => {};

//   return Reanimated;
// });

// // Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// Mocks like this need to be configured at the top level
// of the test file, they can't be setup inside your tests.
// jest.mock('@react-navigation/native', () => {
//   const actualNav = jest.requireActual('@react-navigation/native');
//   return {
//     ...actualNav,

//     useNavigation: () => ({
//       navigate: mockedNavigate,
//       dispatch: mockedDispatch,
//     }),
//   };
// });

// describe('Testing Form Login', () => {
// beforeEach(() => {
//   // Alternatively, set "clearMocks" in your Jest config to "true"
//   // mockedDispatch.mockClear();
// });
// test('Render as expert', () => {
// const {toJSON} = render(<MockedNavigator component={LoginForm} />);
// expect(toJSON()).toMatchSnapshot();
//   expect(1).toBe(1);
// });
// test('PhoneIput has no value and Submit button disable by default', async () => {
//   const {
//     queryByPlaceholderText,
//     queryByText,
//     getAllByText,
//     getByTestId,
//     findByText,
//   } = render(<MockedNavigator component={LoginForm} />);
//   // const submitButton = queryByText('Login');
//   // fireEvent(submitButton, 'press');
//   // expect(submitButton.children[0].children[0]).toEqual('Login');
//   // // expect(submitButton).toBeDisabled();

//   // const phoneInput = queryByPlaceholderText('Phone Number');

//   // expect(phoneInput.props.value).toEqual('');
// });
// });
