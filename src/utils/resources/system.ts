import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';
const deviceType = Platform.select({ios: 'IOS', android: 'ANDROID'});
const appVersion = Platform.select({ios: '0.0.1', android: '0.0.1'});

/**
 * config information of App
 */

const host = {
  api: 'http://api.com',
}; //dev

// const host = {
//   api: 'https://api.app.com',
// }; //pro

//dev
const appKeys = {
  codePush: Platform.select({
    ios: 'key',
    android: 'key',
  }),
  otherKey: 'demo',
};
// pro
// const appKeys = {
//   codePush: Platform.select({
//     ios: 'ZLhrOXs4uTtedmXnCLoLmJ4pGULUAjI6SKrno',
//     android: 'cmoAvGTcgrrAMwcNAk_cRxgear96GkLVFw62D',
//   }),
// };

export {host, isIOS, deviceType, appVersion, appKeys};
