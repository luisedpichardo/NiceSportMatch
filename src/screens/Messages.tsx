import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
// Components
import { ChatPrev } from '../components/ChatPrev';
import { RedirectModal } from '../components/RedirectModal';
import { NoChats } from '../components/NoChats';
import { Loading } from '../components/Loading';
// Hooks
import { useUserChats } from '../hooks/useUserChats';
import { useTheme } from '../hooks/useTheme';
// Types
import { ChatNavStack, NavHomeTab } from '../navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<ChatNavStack, 'Messages'>,
  BottomTabScreenProps<NavHomeTab>
>;

export const Messages = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [visibleModal, setVisibleModal] = useState(false);
  const someone = route.params?.someone;
  const { chats, loading } = useUserChats();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('home-tabs.messages-stack.messages.header-title'),
    });
  });

  useEffect(() => {
    if (someone) {
      setVisibleModal(true);
    }
  }, [route.params]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.secondary }}>
      <RedirectModal
        modalVisible={visibleModal}
        setModalVisible={setVisibleModal}
        someone={someone}
        navigation={navigation}
      />

      <View style={styles.messagesCont}>
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {chats.length > 0 ? (
                <FlatList
                  data={chats}
                  renderItem={({ item, index }) => {
                    return (
                      <ChatPrev
                        key={index}
                        sender={item}
                        navigation={navigation}
                      />
                    );
                  }}
                />
              ) : (
                <NoChats />
              )}
            </>
          )}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesCont: {
    flex: 1,
    marginVertical: '40%',
    borderRadius: 25,
    margin: 20,
  },
});
