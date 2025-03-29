import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'libtest' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const LibTest = NativeModules.LibTest
  ? NativeModules.LibTest
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return LibTest.multiply(a, b);
}
