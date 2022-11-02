import {Dimensions, PixelRatio} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * base screen size = 700:380
 */
const baseScreenWidth = 380;
const baseScreenHight = 700;

// Retrieve initial screen's width and screen's height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const _wpxToDPUnit = screenWidth / baseScreenWidth;
const _hpxToDPUnit = screenHeight / baseScreenHight;

const _wpxToDP = (inPixel: number) => {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(inPixel * _wpxToDPUnit);
};
const _hpxToDP = (inPixel: number) => {
  // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.
  return PixelRatio.roundToNearestPixel(inPixel * _hpxToDPUnit);
};

const Sizes = {
  deviceWidth: screenWidth,
  deviceHeight: screenHeight,
  width: (per: number) => wp(per),
  height: (per: number) => hp(per),

  wpx: (px: number) => _wpxToDP(px),
  hpx: (px: number) => _hpxToDP(px),

  padding: _wpxToDP(12),
  paddinglx: _wpxToDP(8),
  paddinglxx: _wpxToDP(4),

  regular: _wpxToDP(14),
  button: _wpxToDP(15),
  icon: _wpxToDP(18),

  sz15: _hpxToDP(15),
  sz16: _hpxToDP(16),
  sz18: _hpxToDP(18),
  sz20: _hpxToDP(20),
  sz22: _hpxToDP(22),
  sz24: _hpxToDP(24),
  sz26: _hpxToDP(26),

  borderWidth: 1,
  borderWidthlx: 0.5,

  borderRadius: 6,
  borderRadiuslx: 4,
};

export {Sizes};
