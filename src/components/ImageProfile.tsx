import {
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
// Stores
import { userStore } from '../stores/userStore';
// Utils
import {
  convertToBase64Helper,
  openCameraHelper,
  openLibraryHelper,
} from '../utils/ImageHelpers';

export const ImageProfile = () => {
  const { t } = useTranslation();
  const username = userStore(state => state.username);
  const { theme } = useTheme();
  const { imageUri, setImageUri } = useProfileImage(username);

  const updateImage = async () => {
    if (!imageUri) return;

    const base64Image = await convertToBase64Helper(imageUri);
    const base64WithPrefix = `data:image/jpeg;base64,${base64Image}`;

    // Send the update
    if (username) {
      try {
        await getUserRefService(username).update({
          profileImage: base64WithPrefix,
        });
        analyticsService(types.BUTTON, 'User updates profile picture');
        Alert.alert(
          t('settings.profile.img.alert-success'),
          t('settings.profile.img.alert-suc-mess'),
        );
      } catch (err: any) {
        Alert.alert(t('settings.profile.img.alert-fail'), err.message);
      }
    }
  };

  const openLibrary = async () => {
    analyticsService(types.BUTTON, 'User opens library from profile info');
    const uri = await openLibraryHelper();
    setImageUri(uri);
  };

  const openCamera = async () => {
    analyticsService(types.BUTTON, 'User opens camera from profile info');
    const uri = await openCameraHelper();
    setImageUri(uri);
  };

  return (
    <>
      <Image
        testID="image"
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../assets/account_pp_default.jpg')
        }
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
        <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>
          {t('settings.profile.img.update')}
        </Text>
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
