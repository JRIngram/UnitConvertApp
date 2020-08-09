import React from 'react';
import { Platform, StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ConvertorScreen from './src/screens/ConvertorScreen';
import Title from './src/components/title';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TestScreen = () => {
	return (
		<View>
			<Text>I am a test</Text>
		</View>
	);
};

export default function App(): React.ReactNode {
	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<NavigationContainer>
				<Title title="Unit Convertor"></Title>
				<Tab.Navigator>
					<Tab.Screen name="Convertor" component={ConvertorScreen} />
					<Tab.Screen
						name="Saved Conversions"
						component={TestScreen}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	androidSafeArea: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? 25 : 0,
	},
});
