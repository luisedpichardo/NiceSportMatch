import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
// Services
import { readImageUriService } from '../services/UserService';

export const useProfileImage = (user: string | null) => {
  const [imageUri, setImageUri] = useState();

  useFocusEffect(
    useCallback(() => {
      if (user) {
        readImageUriService(user).then(res => {
          setImageUri(res);
        });
      }
    }, [user]),
  );

  return { imageUri, setImageUri };
};
