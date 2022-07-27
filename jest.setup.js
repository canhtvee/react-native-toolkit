require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
jest.useFakeTimers();

jest.mock('react-native-device-info', () =>
  require('react-native-device-info/jest/react-native-device-info-mock'),
);

jest.mock('@gorhom/bottom-sheet', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('./src/utils/resources/images', () => {
  return {getResourceImage: () => 0};
});
