import { Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const compressImage = async (uri: string) => {
  try {
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      512,
      512,
      'JPEG',
      60,
      0,
      undefined,
      false,
      { mode: 'contain' },
    );
    // Convert to base64
    const base64 = await RNFS.readFile(
      Platform.OS === 'ios'
        ? resizedImage.uri.replace('file://', '')
        : resizedImage.uri,
      'base64',
    );
    return base64;
  } catch (err) {
    console.log('Image compression failed', err);
    return null;
  }
};

export const openCameraHelper = async () => {
  try {
    const result: any = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      cameraType: 'back',
      saveToPhotos: true,
    });
    if (result.errorCode) {
      throw new Error(result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const openLibraryHelper = async () => {
  try {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    if (result.errorCode) {
      throw new Error(result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      return result.assets[0].uri;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
