import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TestScreen from './TestScreen';
import SavedConversionListScreen from './SavedConversionListScreen';

const Stack = createStackNavigator();

const ConversionList = () => {
	return (
		<Stack.Navigator initialRouteName="ConversionList">
			<Stack.Screen
				options={{ headerShown: false }}
				name="ConversionList"
				component={SavedConversionListScreen}
			/>
			<Stack.Screen
				options={{
					headerBackTitleVisible: false,
					headerTitle: '',
					gestureDirection: 'horizontal-inverted',
				}}
				name="Test"
				component={TestScreen}
			/>
		</Stack.Navigator>
	);
};

export default ConversionList;
