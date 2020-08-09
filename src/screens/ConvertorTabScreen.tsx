import React from 'react';
import { View, Text } from 'react-native';
import ConvertorScreen from './ConvertorScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TestScreen = () => {
	return (
		<View>
			<Text>I am a test</Text>
		</View>
	);
};

const ConvertorTabScreen = (): JSX.Element => {
	return (
		<View>
			<Tab.Navigator>
				<Tab.Screen name="Convertor" component={ConvertorScreen} />
				<Tab.Screen name="Saved Conversions" component={TestScreen} />
			</Tab.Navigator>
		</View>
	);
};

export default ConvertorTabScreen;
