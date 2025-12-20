import { TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: any;
  text: string;
};

export const RightHdrBtn = ({ onPress, text }: Props) => {
  return (
    <TouchableOpacity style={{ margin: 5 }} onPress={() => onPress()}>
      <Text style={{ fontSize: 16, color: 'white' }}>{text}</Text>
    </TouchableOpacity>
  );
};
