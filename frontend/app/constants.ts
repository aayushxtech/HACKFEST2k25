import { Platform, StatusBar, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const standardWidth = 375;
export const scaleFactor = width / standardWidth;

export const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const TOTAL_HEADER_HEIGHT = Platform.select({
  ios: HEADER_HEIGHT + 50,
  android: HEADER_HEIGHT + (StatusBar.currentHeight || 24),
  default: HEADER_HEIGHT + 24,
});
