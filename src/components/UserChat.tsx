import { FlatList, Text, View } from 'react-native';

type Props = {
  messages: any;
};

export const UserChat = ({ messages }: Props) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => {
        return (
          <View key={item.time} style={{ borderWidth: 1 }}>
            <Text>{item.sender}</Text>
            <Text>{item.text}</Text>
          </View>
        );
      }}
    />
  );
};
