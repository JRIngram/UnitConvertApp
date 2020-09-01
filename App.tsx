import React from 'react';
import { Platform, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Title from './src/components/Title';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialTopTabs from './src/screens/MaterialTopTabs';
import SavedConversionScreen from './src/screens/SavedConversionScreen';

const Stack = createStackNavigator();

export default function App(): React.ReactNode {
	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<NavigationContainer>
				<Title title="Unit Convertor"></Title>
				<Stack.Navigator>
					<Stack.Screen
						name="Unit Convertor"
						component={MaterialTopTabs}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="SavedConversion"
						component={SavedConversionScreen}
						options={{
							headerBackTitleVisible: false,
							headerTitle: '',
							gestureDirection: 'vertical',
						}}
					/>
				</Stack.Navigator>
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
