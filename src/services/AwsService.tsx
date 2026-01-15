import uuid from 'react-native-uuid';
import functions from '@react-native-firebase/functions';
import { Platform } from 'react-native';
import { sendMessageService } from './MessagesService';

export type uploadPic = {
  fileUri: string;
  fileName: string;
  fileType: string;
};

const functionsInstance = functions();

// Test a function locally before deploying
// if (__DEV__) {
//   const host = Platform.OS === 'android' ? '10.0.2.2' : '127.0.0.1';
//   functionsInstance.useEmulator(host, 5001);
// }

export const readDefaultProfilePic = async () => {
  return 'https://nice-sport-match-bucket.s3.us-east-2.amazonaws.com/profile-pics/account_pp_default.jpg';
};

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

export const sendMessagePic = async (
  fileUri: string,
  fileName: string,
  fileType: string,
  sender: string,
) => {
  try {
    const unique = uuid.v4();
    console.log('unique', unique);
    const { data } = await functionsInstance.httpsCallable('sendMessagePic')({
      fileName: unique,
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
    console.log('unique', unique);
    sendMessageService(sender, fileName, finalUrl, 'image', unique).catch(
      err => {
        throw new Error(err.message);
      },
    );

    return finalUrl;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
