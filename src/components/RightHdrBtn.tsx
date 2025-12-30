import { TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: any;
  text: string;
  color: string;
};

export const RightHdrBtn = ({ onPress, text, color }: Props) => {
  return (
    <TouchableOpacity style={{ margin: 5 }} onPress={() => onPress()}>
      <Text style={{ fontSize: 16, color: color }}>{text}</Text>
    </TouchableOpacity>
  );
};
