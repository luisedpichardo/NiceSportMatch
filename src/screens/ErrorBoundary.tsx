import { Component, ErrorInfo, ReactNode } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any): State {
    console.log('get Derived state from error', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Image
            source={require('../../assets/error.png')}
            style={styles.img}
          />
          <Text style={styles.txt}>Something unexpectedly happend!</Text>
          <Text style={styles.txt}>We will try to resolve the issue</Text>
          <Text style={styles.txt}>
            In the mean time, restart the app and try again!
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
  },
  img: {
    width: 150,
    height: 150,
  },
});