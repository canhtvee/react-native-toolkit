import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * base screen size = 700:380
 *
__________________________________
font          fontSize  fontWeight|
----------------------------------|
icon          16                  |
padding	      12                  |
paddingLess	  10                  |
paddingLess1	6                   |
paddingLess2	4                   |
----------------------------------|
h1	          96	      Light     |
h2	          60	      Light     |
h3	          48      	Regular   |
h4	          34	      Regular   |
h5	          24	      Regular   |
h6	          20	      Medium    |
subtitle	    18	      Regular   |
subtitle1	    16	      Medium    |
body    	    15	      regular   |
button  	    15	      regular   |
regular	      14	      regular   |
caption	      12	      regular   |
overline	    10	      regular   |
__________________________________|
 *
 */

const Sizes = {
  deviceWigth: wp(100),
  deviceHeight: hp(100),
  width: (per: number) => wp(per),
  height: (per: number) => hp(per),
  borderRadius: 6,
  borderRadius1: 4,
  ovalRadius: 32,
  elevation: 2,
  borderWidth: 0.6,

  padding: wp(3.2), //12
  paddingLess: wp(2.6), //10
  paddingLess1: wp(1.6), //6
  paddingLess2: wp(1.1), //4

  icon: wp(4.2), //16

  h1: wp(25.3), //96
  h2: wp(15.8), //60
  h3: wp(12.6), //48
  h4: wp(8.9), //34
  h5: wp(6.3), //24
  h6: wp(5.3), //20
  subtitle: wp(4.7), //18
  subtitle1: wp(4.2), //16
  body: wp(3.9), //15
  regular: wp(3.7), //14
  button: wp(3.9), //15
  caption: wp(3.2), //12
  overline: wp(2.6), //10
};

export {Sizes};
