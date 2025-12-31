import { Text, View } from 'react-native';
import { useUserStore } from '../stores/userStore';

type Props = {
  publisher: string;
  status: string;
};

export const LeftSMatchPrev = ({ publisher, status }: Props) => {
  const username = useUserStore(state => state.username);
  return (
    <View>
      {username === publisher ? (
        <Text>Publisher: You</Text>
      ) : (
        <Text>Publisher: {publisher}</Text>
      )}
      <Text>Status: {status}</Text>
    </View>
  );
};
