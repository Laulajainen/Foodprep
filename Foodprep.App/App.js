import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppHeader from './components/appHeader';
import WeeklyDay from './components/weeklyDay';

function App() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <WeeklyDay />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;