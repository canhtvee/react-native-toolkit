// import React from 'react';

// import {cleanup, fireEvent, render} from '@testing-library/react-native';
// import {act, create} from 'react-test-renderer';

// import {FetchApi, MockNavigator, TestIDs} from '../../../utils';

// import Login from '../Login';

// /**
//  * Run test command
//  * yarn test -u -t="LoginScreen"
//  */

// afterEach(cleanup);

// const mockNavigate = jest.fn(name => console.log('navigate', name));
// jest.mock('@react-navigation/native', () => {
//   const navModule = jest.requireActual('@react-navigation/native');
//   return {
//     ...navModule,
//     useNavigation: jest.fn(() => ({
//       navigate: mockNavigate,
//     })),
//   };
// });

// jest.mock('../../../utils/modules/FetchApi', () => ({
//   FetchApi: {
//     login: jest.fn(
//       data => new Promise(resolve => resolve({...data, status: 'successful'})),
//     ),
//   },
// }));

// const getElements = tree => {
//   return {
//     phone: tree.getByTestId(TestIDs.Login_input_phone),
//     password: tree.getByTestId(TestIDs.Login_input_password),
//     submit: tree.getByTestId(TestIDs.Login_button_submit),
//     rememberAccount: tree.getByTestId(TestIDs.Login_button_remember_account),
//     forgotPass: tree.getByTestId(TestIDs.Login_button_forgot_pass),
//     signUp: tree.getByTestId(TestIDs.Login_button_sign_up),
//   };
// };

// const TestCase = MockNavigator({
//   component: Login,
//   params: {},
// });

// describe('LoginScreen', () => {
//   test('should render correctly', async () => {
//     const tree = render(<TestCase />);
//     expect(tree.toJSON()).toMatchSnapshot();
//   });
//   /**
//    *
//    */
//   test('should update input values if change text', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password} = getElements(tree);
//     fireEvent.changeText(phone, '0123456789');
//     await act(async () => fireEvent.changeText(phone, '0123456789'));
//     await act(async () => fireEvent.changeText(password, '0123456789@base'));
//     expect(phone.props.value).toBe('0123456789');
//     expect(password.props.value).toBe('0123456789@base');
//   });
//   /**
//    *
//    */
//   test('should update show error on press submit if inputs invalid', async () => {
//     const tree = render(<TestCase />);
//     const {submit} = getElements(tree);
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledTimes(0);
//   });
//   /**
//    *
//    */
//   test('should not invoke login api if phone empty', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password, submit} = getElements(tree);
//     await act(async () => fireEvent.changeText(phone, ''));
//     await act(async () => fireEvent.changeText(password, '0123456789@base'));
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledTimes(0);
//   });
//   /**
//    *
//    */
//   test('should not invoke login api if password empty', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password, submit} = getElements(tree);
//     await act(async () => fireEvent.changeText(phone, '+6568737777'));
//     await act(async () => fireEvent.changeText(password, ''));
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledTimes(0);
//   });
//   /**
//    *
//    */
//   test('should not invoke login api if inputs invalid', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password, submit} = getElements(tree);
//     await act(async () => fireEvent.changeText(phone, '+8468737777'));
//     await act(async () => fireEvent.changeText(password, '0123456789@base'));
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledTimes(0);
//   });
//   /**
//    *
//    */
//   test('should invoke login api if inputs valid', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password, submit} = getElements(tree);
//     await act(async () => fireEvent.changeText(phone, '+6568737777'));
//     await act(async () => fireEvent.changeText(password, '0123456789@base'));
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledWith({
//       phone: '+6568737777',
//       password: '0123456789@base',
//       rememberAccount: true,
//     });
//   });
//   /**
//    *
//    */
//   test('should invoke login api and not remember account', async () => {
//     const tree = render(<TestCase />);
//     const {phone, password, submit, rememberAccount} = getElements(tree);
//     await act(async () => fireEvent.changeText(phone, '+6568737777'));
//     await act(async () => fireEvent.changeText(password, '0123456789@base'));
//     await act(async () => fireEvent.press(rememberAccount));
//     await act(async () => fireEvent.press(submit));
//     expect(FetchApi.login).toHaveBeenCalledWith({
//       phone: '+6568737777',
//       password: '0123456789@base',
//       rememberAccount: false,
//     });
//   });
//   /**
//    *
//    */
//   test('should invoke navigate to ForgotPass if press forgotPass', async () => {
//     const tree = render(<TestCase />);
//     const {forgotPass} = getElements(tree);
//     await act(async () => fireEvent.press(forgotPass));
//     expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
//   });
//   /**
//    *
//    */
//   test('should invoke navigate to SignUp if press signUp', async () => {
//     const tree = render(<TestCase />);
//     const {signUp} = getElements(tree);
//     await act(async () => fireEvent.press(signUp));
//     expect(mockNavigate).toHaveBeenCalledWith('SignUp');
//   });
//   /**
//    *
//    */
// });
