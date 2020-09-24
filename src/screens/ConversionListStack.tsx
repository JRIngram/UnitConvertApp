import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SavedConversionListScreen from './SavedConversionListScreen';
import SavedConversionScreen from './SavedConversionScreen';

const Stack = createStackNavigator();

const ConversionList: React.FC = (): ReactElement => {
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
				name="SavedConversion"
				component={SavedConversionScreen}
			/>
		</Stack.Navigator>
	);
};

export default ConversionList;
