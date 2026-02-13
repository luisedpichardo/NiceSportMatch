const functions = require('firebase-functions');
const admin = require('firebase-admin');

type Notification = {
  title: string;
  body: string;
  tokens: Array<string>;
};
type NotifProps = {
  data: Notification;
};
admin.initializeApp();

export const notifMessage = functions.https.onCall(
  async ({ data }: NotifProps) => {
    console.log('data', data);

    if (!data.tokens || data.tokens.length === 0) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'No tokens provided.',
      );
    }
    try {
      const response = await admin.messaging().sendEachForMulticast({
        notification: {
          title: data.title,
          body: data.body,
        },
        tokens: data.tokens,
      });
      return {
        success: true,
        sentCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (e: any) {
      throw new functions.https.HttpsError(
        'internal',
        'FCM delivery failed',
        e.message,
      );
    }
  },
);
