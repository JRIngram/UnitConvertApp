import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SavedConversionsListButton from '../components/SavedConversionsListButton';
import ListSeperator from '../components/ListSeperator';
import { createStackNavigator } from '@react-navigation/stack';
import { useLinkProps } from '@react-navigation/native';

interface ISavedList {
	dataLoaded: boolean;
	savedConversions: any;
}

const SavedConversionListScreen = ({ navigation }) => {
	const [savedList, setSavedList] = useState<ISavedList>({
		dataLoaded: false,
		savedConversions: { conversions: [] },
	});

	const loadSavedConversions = async () => {
		try {
			console.log('Reading data...');
			const loadedConversionString = await AsyncStorage.getItem(
				'saved_conversions'
			);
			let loadedConversions = {};
			if (loadedConversionString != null) {
				loadedConversions = await JSON.parse(loadedConversionString);
			}

			console.log(loadedConversions);
			if (loadedConversions) {
				setSavedList({
					dataLoaded: true,
					savedConversions: loadedConversions,
				});
			}
			console.log(savedList);
		} catch (e) {
			// error reading value
			console.error(e);
		}
	};

	useEffect(() => {
		if (!savedList.dataLoaded) {
			loadSavedConversions();
		}
	});

	const displaySavedConversions = () => {
		if (!savedList.dataLoaded) {
			return <Text>Loading saved conversions...</Text>;
		} else {
			const conversions = savedList.savedConversions.conversions;
			return (
				<FlatList
					data={conversions}
					renderItem={({ item }) => (
						<SavedConversionsListButton
							onPress={() => {
								navigation.navigate('Test', {
									title: item.title,
								});
							}}
							title={item.title}
						/>
					)}
					keyExtractor={(item) => item}
					ItemSeparatorComponent={ListSeperator}
				/>
			);
		}
	};

	return <View>{displaySavedConversions()}</View>;
};

export default SavedConversionListScreen;
