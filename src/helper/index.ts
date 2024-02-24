import { Platform } from 'react-native';

const majorVersionIOS = parseInt(String(Platform.Version), 10);
export const isAutoFillSupported =
  Platform.OS === 'ios' && majorVersionIOS >= 12;

export const codeToArray = (code?: string): string[] => code?.split('') ?? [];

export default { isAutoFillSupported, codeToArray };
