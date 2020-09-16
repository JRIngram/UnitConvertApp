import React, { ReactElement } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ConvertorScreen from './ConvertorScreen';
import SavedConversionListScreen from './SavedConversionListScreen';

const Tab = createMaterialTopTabNavigator();

const MaterialTopTabs: React.FC = (): ReactElement => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Convertor" component={ConvertorScreen} />
			<Tab.Screen
				name="Saved Conversions"
				component={SavedConversionListScreen}
			/>
		</Tab.Navigator>
	);
};

export default MaterialTopTabs;
