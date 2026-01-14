import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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
      return {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
      };
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
      return {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
      };
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
