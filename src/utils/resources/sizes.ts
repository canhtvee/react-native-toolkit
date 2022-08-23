import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * base screen size = 700:380
 */

const DEVICE_WIDTH = wp(100);
const DEVICE_HEIGHT = hp(100);

const _wpxToDPUnit = DEVICE_WIDTH / 380;
const _hpxToDPUnit = DEVICE_HEIGHT / 700;

const _wpxToDP = (value: number) => value * _wpxToDPUnit;
const _hpxToDP = (value: number) => value * _hpxToDPUnit;

const Sizes = {
  deviceWigth: DEVICE_WIDTH,
  deviceHeight: DEVICE_HEIGHT,
  width: (per: number) => wp(per),
  height: (per: number) => hp(per),

  wpx: (px: number) => _wpxToDP(px),
  hpx: (px: number) => _hpxToDP(px),

  padding: _wpxToDP(12),
  paddinglx: _wpxToDP(8),
  paddinglxx: _wpxToDP(4),

  regular: _wpxToDP(14),
  button: _wpxToDP(15),
  icon: _wpxToDP(16),

  borderWidth: 1,
  borderWidthlx: 0.5,

  borderRadius: 6,
  borderRadiuslx: 4,

  textInputPaddingVertical: Platform.select({
    ios: _wpxToDP(12),
    android: undefined,
  }),
};

export {Sizes};
