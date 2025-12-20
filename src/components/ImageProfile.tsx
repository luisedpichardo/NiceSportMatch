import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import firestore from '@react-native-firebase/firestore';
import { getAuth, signOut } from '@react-native-firebase/auth';
import ImageResizer from 'react-native-image-resizer';

export const ImageProfile = () => {
  const [imageUri, setImageUri] = useState();

  useEffect(() => {
    const user: any = getAuth().currentUser;
    if (!user) noUserDetected();
    firestore()
      .collection('users')
      .doc(user.email)
      .get()
      .then((userData: any) => {
        const image = userData.data().profileImage;
        if (image) {
          const imageWithPrefix = image.startsWith('data:image')
            ? image
            : `data:image/jpeg;base64,${image}`;
          setImageUri(imageWithPrefix);
        }
      });
  });

  const updateImage = async () => {
    console.log('updating');
    const user: any = getAuth().currentUser;
    if (!user) noUserDetected();
    // Assign data
    const updatedData: any = {};
    if (imageUri) {
      const compressedBase64 = await compressImage(imageUri);
      if (compressedBase64) {
        updatedData.profileImage = compressedBase64;
      }
    }
    // Get reference for the user
    const userRef: any = firestore().collection('users').doc(user.email);
    // Send the update
    try {
      await userRef.update(updatedData);
      Alert.alert('Success', 'Account updated!');
      // navigation.goBack();
    } catch (err: any) {
      console.log(err);
      Alert.alert('Failed to update account.', err.message);
    }
  };

  const compressImage = async (uri: string) => {
    try {
      const resizedImage = await ImageResizer.createResizedImage(
        uri,
        512,
        512,
        'JPEG',
        60,
        0,
        undefined,
        false,
        { mode: 'contain' },
      );
      // Convert to base64
      const base64 = await RNFS.readFile(
        Platform.OS === 'ios'
          ? resizedImage.uri.replace('file://', '')
          : resizedImage.uri,
        'base64',
      );
      return base64;
    } catch (err) {
      console.log('Image compression failed', err);
      return null;
    }
  };

  const noUserDetected = async () => {
    signOut(getAuth());
    Alert.alert('Error', 'No valid user');
  };

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
      <View style={styles.btnsOpt}>
        <TouchableOpacity onPress={openLibrary} style={styles.btn}>
          <Text>Choose from library</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera} style={styles.btn}>
          <Text>Take Picture</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => updateImage()}>
        <Text style={styles.txt}>Update Image</Text>
      </TouchableOpacity>
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
