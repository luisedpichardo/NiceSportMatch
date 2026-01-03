import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
// Screens
import { MyMatches } from '../screens/MyMatches';
import { OtherMatches } from '../screens/OtherMatches';

const renderScene = ({ route }: any) => {
  console.log(route);
  switch (route.key) {
    case 'my':
      return (
        <View style={styles.page}>
          <MyMatches />
        </View>
      );
    case 'other':
      return (
        <View style={styles.page}>
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
      indicatorStyle={{ backgroundColor: 'green' }}
      activeColor={'black'}
      inactiveColor={'green'}
      style={styles.tabSty}
    />
  );
};

const routes = [
  { key: 'my', title: 'My Matches' },
  { key: 'other', title: 'Other Matches' },
];

export function MatchesTab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

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
    backgroundColor: 'lightgreen',
  },
  tabSty: {
    backgroundColor: 'lightgreen',
    paddingTop: '30%',
  },
});
