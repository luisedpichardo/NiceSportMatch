import functions from '@react-native-firebase/functions';
import { Platform } from 'react-native';

export type uploadPic = {
  fileUri: string;
  fileName: string;
  fileType: string;
};

const functionsInstance = functions();

if (__DEV__) {
  const host = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
  functionsInstance.useEmulator(host, 5001);
}

export const uploadProfilePic = async ({
  fileUri,
  fileName,
  fileType,
}: uploadPic) => {
  try {
    const { data } = await functionsInstance.httpsCallable('uploadImage')({
      fileName,
      fileType,
    });
    const { uploadUrl, finalUrl } = data;

    const response = await fetch(fileUri);
    const blob = await response.blob();

    await fetch(uploadUrl, {
      method: 'PUT',
      body: blob,
      headers: { 'Content-Type': fileType },
    });

    return finalUrl;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const readDefaultProfilePic = async () => {
  return 'https://nice-sport-match-bucket.s3.us-east-2.amazonaws.com/profile-pics/account_pp_default.jpg';
};
