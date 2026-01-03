import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
// Screens
import { MyMatches } from '../screens/MyMatches';
import { OtherMatches } from '../screens/OtherMatches';
// Stores
import { useStore } from '../stores/userStore';
// Utils
import { darkTheme, lightTheme } from '../utils/Colors';

const routes = [
  { key: 'my', title: 'My Matches' },
  { key: 'other', title: 'Other Matches' },
];

export function MatchesTab() {
  const layout = useWindowDimensions();
  const colorScheme = useStore(state => state.theme);
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [index, setIndex] = useState(0);

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'my':
        return (
          <View style={{ ...styles.page, backgroundColor: theme.secondary }}>
            <MyMatches />
          </View>
        );
      case 'other':
        return (
          <View style={{ ...styles.page, backgroundColor: theme.secondary }}>
            <OtherMatches />
          </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: theme.primary }}
        activeColor={theme.textPrimary}
        inactiveColor={theme.primary}
        style={{ ...styles.tabSty, backgroundColor: theme.secondary }}
      />
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  tabSty: {
    paddingTop: '30%',
  },
});
