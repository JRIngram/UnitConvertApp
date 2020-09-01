import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SavedConversionsListButton from '../components/SavedConversionsListButton';
import ListSeperator from '../components/ListSeperator';

interface ISavedList {
	dataLoaded: boolean;
	savedConversions: any;
}
/*eslint-disable*/
const SavedConversionListScreen = ({ navigation }) => {
	/*eslint-enable*/
	const [savedList, setSavedList] = useState<ISavedList>({
		dataLoaded: false,
		savedConversions: { conversions: [] },
	});

	/*eslint-disable*/
	const onScreenLoad = navigation.addListener('focus', () => {
		/*eslint-enable*/
		setSavedList({
			dataLoaded: false,
			savedConversions: { conversions: [] },
		});
		loadSavedConversions();
	});

	const loadSavedConversions = async () => {
		try {
			const loadedConversionString = await AsyncStorage.getItem(
				'saved_conversions'
			);
			let loadedConversions = {};
			if (loadedConversionString != null) {
				loadedConversions = await JSON.parse(loadedConversionString);
			}

			if (loadedConversions) {
				setSavedList({
					dataLoaded: true,
					savedConversions: loadedConversions,
				});
			}
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
			return <ActivityIndicator size="large" />;
		} else {
			const conversions = savedList.savedConversions;
			return (
				<FlatList
					data={conversions}
					renderItem={({ item }) => (
						<SavedConversionsListButton
							onPress={() => {
								/*eslint-disable*/
								navigation.navigate('SavedConversion', {
									title: item.title,
								});
								/*eslint-enable*/
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

	return <View style={styles.container}>{displaySavedConversions()}</View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});

export default SavedConversionListScreen;
