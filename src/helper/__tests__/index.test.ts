import { Platform } from 'react-native';
import { isAutoFillSupported, codeToArray } from '../index';

describe('Helper functions', () => {
  describe('isAutoFillSupported', () => {
    const originalPlatform = Platform;

    afterEach(() => {
      Platform.OS = originalPlatform.OS;
      Platform.Version = originalPlatform.Version;
    });

    it('should return false for iOS below 12', () => {
      Platform.OS = 'ios';
      Platform.Version = '11.4';
      expect(isAutoFillSupported).toBe(false);
    });

    it('should return false for non-iOS platforms', () => {
      Platform.OS = 'android';
      Platform.Version = '10';
      expect(isAutoFillSupported).toBe(false);
    });
  });

  describe('codeToArray', () => {
    it('should convert a string to an array of characters', () => {
      expect(codeToArray('1234')).toEqual(['1', '2', '3', '4']);
    });

    it('should return an empty array for an empty string', () => {
      expect(codeToArray('')).toEqual([]);
    });

    it('should return an empty array for undefined input', () => {
      expect(codeToArray(undefined)).toEqual([]);
    });

    it('should handle special characters', () => {
      expect(codeToArray('a!@#')).toEqual(['a', '!', '@', '#']);
    });
  });
});
