import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SavedConversionsListButton from '../components/SavedConversionsListButton';
import ListSeperator from '../components/ListSeperator';

interface ISavedList {
	dataLoaded: boolean;
	savedConversions: any;
}

const SavedConversionListScreen = () => {
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
			const savedTitles = [];
			const conversions = savedList.savedConversions.conversions;
			for (let i = 0; i < conversions.length; i++) {
				savedTitles.push(
					<SavedConversionsListButton title={conversions[i].title} />
				);
			}
			return (
				<FlatList
					data={savedList.savedConversions.conversions}
					renderItem={({ item }) => (
						<SavedConversionsListButton title={item.title} />
					)}
					keyExtractor={(item) => item}
					ItemSeparatorComponent={ListSeperator}
				/>
			);
			return savedTitles;
		}
	};

	return <View>{displaySavedConversions()}</View>;
};

export default SavedConversionListScreen;
