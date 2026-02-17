import { FlatList } from 'react-native';
// Components
import { BubbleChat } from './BubbleChat';

type Props = {
  messages: any;
};

export const UserChat = ({ messages }: Props) => {
  return (
    <FlatList
      data={messages}
      inverted
      renderItem={({ item }) => {
        return <BubbleChat item={item} key={item.time} />;
      }}
    />
  );
};
