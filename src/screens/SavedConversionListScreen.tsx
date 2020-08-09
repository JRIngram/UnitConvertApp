import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const SavedConversionListScreen = () => {
	const [savedList, setSavedList] = useState({
		dataLoaded: false,
		savedConversion: {
			conversionOutputValue: '',
			conversionOutputUnit: '',
		},
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
					savedConversion: loadedConversions,
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
			const savedDisplay = `${savedList.savedConversion.conversionOutputValue}${savedList.savedConversion.conversionOutputUnit}`;
			return;
			<View>
				<Text>{savedDisplay}</Text>
			</View>;
		}
	};

	return <View>{displaySavedConversions()}</View>;
};

export default SavedConversionListScreen;
