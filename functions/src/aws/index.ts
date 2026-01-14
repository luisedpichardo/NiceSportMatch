import { BUCKET_NAME, s3Client } from '../utils/aws';
const functions = require('firebase-functions');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

export const uploadImage = functions.https.onCall(async (data: any) => {
  const { fileName, fileType } = data.data;
  // Get extension for image file
  const extension = fileType.split('/')[1] || 'jpg';
  const key = `profile-pics/${fileName}.${extension}`;
  // Prepare the image to send to the bucket
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const uploadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300,
    });
    // Prepare final url
    const finalUrl = `https://${BUCKET_NAME}.s3.us-east-2.amazonaws.com/${key}`;

    return { uploadUrl, finalUrl };
  } catch (err: any) {
    console.log(err);
    throw new functions.https.HttpsError('internal', err.message);
  }
});
