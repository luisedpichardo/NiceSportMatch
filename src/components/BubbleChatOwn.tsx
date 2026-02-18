import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Service
import { removeMessageService } from '../services/MessagesService';

export const BubbleChatOwn = ({ item }) => {
  const { theme } = useTheme();
  const position = useSharedValue(0);
  const startX = useSharedValue(0);

  const onDeletedMessage = id => {
    console.log('id to remove', id);
    removeMessageService(id);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      startX.value = position.value;
    })
    .onUpdate(e => {
      position.value = startX.value + e.translationX;
      if (position.value > -25) {
        position.value = withSpring(0);
      } else {
        position.value = withSpring(-50);
      }
    });

  return (
    <>
      <Pressable style={styles.btn} onPress={() => onDeletedMessage(item.id)}>
        <Image
          source={require('../../assets/trash-bin.png')}
          style={styles.imgDel}
        />
      </Pressable>

      {item.image ? (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.yourImg,
              {
                backgroundColor: theme.ownBubble,
              },
              animatedStyle,
            ]}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.yourImg}
            />
          </Animated.View>
        </GestureDetector>
      ) : (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.yourMessage,
              { backgroundColor: theme.ownBubble },
              animatedStyle,
            ]}
          >
            <Text style={{ color: theme.ownChatText }}>{item.message}</Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    right: 0,
    padding: 10,
    backgroundColor: '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 15,
  },
  imgDel: {
    tintColor: '#ffffff',
    width: 20,
    height: 20,
  },
  yourImg: {
    flex: 1,
    width: 200,
    height: 200,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  yourMessage: {
    padding: 12,
    borderRadius: 15,
    borderBottomRightRadius: 1,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
});
