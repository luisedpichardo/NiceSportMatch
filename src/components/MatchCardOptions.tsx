import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MatchNotOwnOpt } from './MatchNotOwnOpt';

type Props = {
  publisher: string;
  own: boolean;
};

export const MatchCardOptions = ({ publisher, own }: Props) => {
  return (
    <>
      {own ? (
        <TouchableOpacity
          onPress={() => console.log('open edit')}
          style={styles.btn}
        >
          <Text style={styles.txt}>Modify</Text>
        </TouchableOpacity>
      ) : (
        <MatchNotOwnOpt publisher={publisher} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'lightgreen',
  },
  txt: {
    fontWeight: 'bold',
  },
});
