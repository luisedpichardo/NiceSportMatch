import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// Hooks
import { useTheme } from '../hooks/useTheme';
import { analyticsService, types } from '../services/AnalyticsService';
import { openCameraHelper, openLibraryHelper } from '../utils/ImageHelpers';
import { useState } from 'react';
import { sendMessagePic } from '../services/AwsService';
import { userStore } from '../stores/userStore';

type Props = {
  modalVisible: any;
  setModalVisible: any;
  receiver: string;
};

export const SelectImgModal = ({
  modalVisible,
  setModalVisible,
  receiver,
}: Props) => {
  const { theme } = useTheme();
  const [imageUri, setImageUri] = useState('');
  const [imageExists, setImageExists] = useState(false);
  const [type, setType] = useState('');
  const [validating, setValidating] = useState(false);
  const { username } = userStore();

  const openLibrary = async () => {
    analyticsService(types.BUTTON, 'User opens library from profile info');
    const img: any = await openLibraryHelper();
    setType(cleanFileType(img.type));
    setImageUri(img.uri);
    setImageExists(true);
  };

  const openCamera = async () => {
    analyticsService(types.BUTTON, 'User opens camera from profile info');
    const img: any = await openCameraHelper();
    setType(cleanFileType(img.type));
    setImageUri(img.uri);
    setImageExists(true);
  };

  const cleanFileType = (type: string) => {
    const t = type.toLowerCase();
    if (t === 'image/jpg') return 'image/jpeg';
    return t;
  };

  const onSendImage = () => {
    setValidating(true);
    sendMessagePic(imageUri, receiver, type, username);
    setValidating(false);
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: theme.surface }}>
          <Text>Choose where to get image from</Text>
          {imageExists && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 30, height: 30 }}
            />
          )}
          <View testID="optionsBtnsCont" style={styles.btnsOpt}>
            <Pressable
              testID="openLib"
              onPress={openLibrary}
              style={[styles.btn, { backgroundColor: theme.primary }]}
            >
              <Text style={[styles.btnTxt, { color: theme.textWhite }]}>
                Choose
              </Text>
            </Pressable>
            <Pressable
              onPress={openCamera}
              style={[styles.btn, { backgroundColor: theme.primary }]}
            >
              <Text style={[styles.btnTxt, { color: theme.textWhite }]}>
                Take
              </Text>
            </Pressable>
          </View>

          <Pressable
            testID="updateBtn"
            onPress={() => onSendImage()}
            style={[styles.btnConf, { backgroundColor: theme.surface }]}
          >
            {validating ? (
              <ActivityIndicator size="large" />
            ) : (
              <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>
                Send
              </Text>
            )}
          </Pressable>

          <Pressable
            style={{
              ...styles.button,
              ...styles.buttonClose,
              borderColor: theme.primary,
              backgroundColor: theme.surface,
            }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    alignItems: 'center',
    margin: 15,
    borderRadius: 20,
    padding: 35,
  },

  btnsOpt: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },

  button: {
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    elevation: 2,
    marginVertical: 5,
  },
  buttonClose: {
    borderWidth: 2,
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
