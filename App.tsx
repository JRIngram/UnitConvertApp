import React from 'react';
import { Platform, StyleSheet, SafeAreaView } from 'react-native';
import ConvertorScreen from './src/screens/ConvertorScreen';

export default function App(): React.ReactNode {
	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<ConvertorScreen />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	androidSafeArea: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 25 : 0,
	},
});
