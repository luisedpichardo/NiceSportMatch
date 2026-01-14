import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { useProfileImage } from '../hooks/useProfileImage';
import { useTheme } from '../hooks/useTheme';
// Service
import { getUserRefService } from '../services/UserService';
import { analyticsService, types } from '../services/AnalyticsService';
import { uploadPic, uploadProfilePic } from '../services/AwsService';
// Stores
import { userStore } from '../stores/userStore';
// Utils
import { openCameraHelper, openLibraryHelper } from '../utils/ImageHelpers';

export const ImageProfile = () => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const { imageUri, setImageUri } = useProfileImage(username);
  const [type, setType] = useState('');
  const [validating, setValidating] = useState(false);

  const updateImage = async () => {
    setValidating(true);
    if (!imageUri || !username) {
      setValidating(false);
      return;
    }

    const imgData: uploadPic = {
      fileUri: imageUri,
      fileName: username,
      fileType: type,
    };
    const imgUrl = await uploadProfilePic(imgData);

    // Send the update
    if (username) {
      try {
        await getUserRefService(username).update({
          imageUri: imgUrl,
        });
        analyticsService(types.BUTTON, 'User updates profile picture');
        setValidating(false);
        Alert.alert(
          t('settings.profile.img.alert-success'),
          t('settings.profile.img.alert-suc-mess'),
        );
      } catch (err: any) {
        setValidating(false);
        Alert.alert(t('settings.profile.img.alert-fail'), err.message);
      }
    }
  };

  const openLibrary = async () => {
    analyticsService(types.BUTTON, 'User opens library from profile info');
    const img: any = await openLibraryHelper();
    setType(cleanFileType(img.type));
    setImageUri(img.uri);
  };

  const openCamera = async () => {
    analyticsService(types.BUTTON, 'User opens camera from profile info');
    const img: any = await openCameraHelper();
    setType(cleanFileType(img.type));
    setImageUri(img.uri);
  };

  const cleanFileType = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'image/jpg') return 'image/jpeg';
    return t;
  };

  return (
    <>
      <Image
        testID="image"
        source={{ uri: imageUri }}
        style={styles.imgStyle}
      />
      <View testID="optionsBtnsCont" style={styles.btnsOpt}>
        <TouchableOpacity
          testID="openLib"
          onPress={openLibrary}
          style={[styles.btn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.btnTxt, { color: theme.textWhite }]}>
            {t('settings.profile.img.choose')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openCamera}
          style={[styles.btn, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.btnTxt, { color: theme.textWhite }]}>
            {t('settings.profile.img.take')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        testID="updateBtn"
        onPress={() => updateImage()}
        style={[styles.btnConf, { backgroundColor: theme.surface }]}
      >
        {validating ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>
            {t('settings.profile.img.update')}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  btnsOpt: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  btnTxt: {
    fontWeight: 'bold',
  },
  btnConf: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
