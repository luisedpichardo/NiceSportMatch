import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// Helpers
import {
  openCameraHelper,
  openLibraryHelper,
} from '../utils/ImageHelpers';
// Service
import {
  getUserRefService,
  readImageUriService,
} from '../services/UserService';
// Stores
import { useUserStore } from '../stores/userStore';

export const ImageProfile = () => {
  const [imageUri, setImageUri] = useState();

  useEffect(() => {
    const username = useUserStore.getState().username;
    if (username) {
      readImageUriService(username).then(res => {
        setImageUri(res);
      });
    }
  }, []);

  const updateImage = async () => {
    const username = useUserStore.getState().username;
    const updatedData: any = {};
    if (imageUri) {
      updatedData.imageUri = imageUri;
    }
    // Send the update
    if (username) {
      try {
        await getUserRefService(username).update(updatedData);
        Alert.alert('Success', 'Image updated!');
      } catch (err: any) {
        console.log(err);
        Alert.alert('Failed to update image.', err.message);
      }
    }
  };

  const openLibrary = async () => {
    const uri = await openLibraryHelper();
    setImageUri(uri);
  };

  const openCamera = async () => {
    const uri = await openCameraHelper();
    setImageUri(uri);
  };

  return (
    <View>
      <Image source={{ uri: imageUri }} style={styles.imgStyle} />
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
