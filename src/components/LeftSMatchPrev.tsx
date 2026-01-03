import { Image, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { useProfileImage } from '../hooks/useProfileImage';
// Stores
import { useStore } from '../stores/userStore';

type Props = {
  publisher: string;
  status: string;
};

export const LeftSMatchPrev = ({ publisher, status }: Props) => {
  const { t } = useTranslation();
  const username = useStore(state => state.username);
  const { imageUri } = useProfileImage(publisher);

  return (
    <View style={styles.container}>
      {username === publisher ? (
        <></>
      ) : (
        <>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : require('../../assets/account_pp_default.jpg')
            }
            style={styles.imgStyle}
          />
          <Text>
            {t('home-tabs.match-stack.matches.prev.publisher')}: {publisher}
          </Text>
        </>
      )}
      <Text>
        {t('home-tabs.match-stack.matches.prev.status')}: {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },
  imgStyle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 5,
  },
});
