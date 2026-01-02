import uuid from 'react-native-uuid';
import analytics from '@react-native-firebase/analytics';

export const types = {
	BUTTON: 'button',
}

export const analyticsService = async (item: string, description: string) => {
  try {
    await analytics().logEvent('basket', {
      id: uuid.v4(),
      item,
      description,
    });
    console.log('Log Event to Firebase Analytics: ', item);
  } catch (e: any) {
    throw new Error(e.message);
  }
};
