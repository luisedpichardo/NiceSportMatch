import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
// Hooks
import { useTheme } from '../hooks/useTheme';
// Screens
import { MyMatches } from '../screens/MyMatches';
import { OtherMatches } from '../screens/OtherMatches';

export function MatchesTab() {
  const layout = useWindowDimensions();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'my', title: t('home-tabs.match-stack.matches.my-matches') },
    { key: 'other', title: t('home-tabs.match-stack.matches.other-matches') },
  ];

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
