import React from 'react';
import { Platform, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ConvertorScreen from './src/screens/ConvertorScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <ConvertorScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0
  }
});
