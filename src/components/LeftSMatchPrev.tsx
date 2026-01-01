import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
// Stores
import { useUserStore } from '../stores/userStore';

type Props = {
  publisher: string;
  status: string;
};

export const LeftSMatchPrev = ({ publisher, status }: Props) => {
  const { t } = useTranslation();
  const username = useUserStore(state => state.username);
  return (
    <View>
      {username === publisher ? (
        <Text>
          {t('home-tabs.match-stack.matches.prev.publisher')}:{' '}
          {t('home-tabs.match-stack.matches.prev.you')}
        </Text>
      ) : (
        <Text>
          {t('home-tabs.match-stack.matches.prev.publisher')}: {publisher}
        </Text>
      )}
      <Text>
        {t('home-tabs.match-stack.matches.prev.status')}: {status}
      </Text>
    </View>
  );
};
