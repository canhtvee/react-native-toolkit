import {Platform} from 'react-native';

const isIOS = Platform.OS === 'ios';
const deviceType = Platform.select({ios: 'IOS', android: 'ANDROID'});
const appVersion = Platform.select({ios: '0.0.1', android: '0.0.1'});

/**
 * config information of App
 */

const host = {
  api: 'http://api.com',
}; //stg

// const host = {
//   api: 'https://api.app.com',
// }; //pro

//stg
const appKeys = {
  codePush: Platform.select({
    ios: '0Flb9VF_ReYEFMaCRKL2HLsd_cfwmN4XQE4E_',
    android: 'N1orohLsv5oTtuuW_sbML90rdQQqJry5edTTj',
  }),
  otherKey: 'demo',
};
// pro
// const appKeys = {
//   codePush: Platform.select({
//     ios: 'QWyGnBfz2KLiqua0QK7VHsEFpoEFHZyahtJlO',
//     android: '5Xu-qtJ9OT88tQC8FWEkOx0_BIGBB64yvf_dr',
//   }),
// };

export {host, isIOS, deviceType, appVersion, appKeys};
