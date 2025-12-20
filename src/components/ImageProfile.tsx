import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const ImageProfile = () => {
  const [imageUri, setImageUri] = useState();

  const openLibrary = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const openCamera = async () => {
    try {
      const result: any = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        cameraType: 'back',
        saveToPhotos: true,
      });
      if (result.errorCode) {
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../assets/account_pp_default.jpg')
        }
        style={styles.imgStyle}
      />
      <Text style={styles.txt}>Update Image</Text>
      <View style={styles.btnsOpt}>
        <TouchableOpacity onPress={openLibrary} style={styles.btn}>
          <Text>Choose from library</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.btn}>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  txt: {
    alignSelf: 'center',
    backgroundColor: 'white',
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  btnsOpt: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  btn: {
    backgroundColor: 'lightgreen',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});
