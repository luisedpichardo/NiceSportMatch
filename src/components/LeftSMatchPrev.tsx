import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
// Hooks
import { useProfileImage } from '../hooks/useProfileImage';
import { useTheme } from '../hooks/useTheme';
// Stores
import { userStore } from '../stores/userStore';

type Props = {
  publisher: string;
  status: string;
};

export const LeftSMatchPrev = ({ publisher, status }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const username = userStore(state => state.username);
  const { imageUri } = useProfileImage(publisher);

  return (
    <View testID="container" style={styles.container}>
      {username === publisher ? (
        <></>
      ) : (
        <>
          <FastImage
            testID="image"
            source={{ uri: imageUri }}
            style={styles.imgStyle}
          />
          <Text testID="publisherTxt" style={{ color: theme.textPrimary }}>
            {t('home-tabs.match-stack.matches.prev.publisher')}: {publisher}
          </Text>
        </>
      )}
      <Text testID="statusTxt" style={{ color: theme.textPrimary }}>
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
