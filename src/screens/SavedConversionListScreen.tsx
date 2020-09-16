import React, { useState, useCallback, ReactElement } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SavedConversionsListButton from '../components/SavedConversionsListButton';
import ListSeperator from '../components/ListSeperator';
import { useFocusEffect } from '@react-navigation/native';

interface ISavedList {
	dataLoaded: boolean;
	savedConversions: any;
}
/*eslint-disable*/
const SavedConversionListScreen: React.FC = ({ navigation }): ReactElement => {
	/*eslint-enable*/
	const [savedList, setSavedList] = useState<ISavedList>({
		dataLoaded: false,
		savedConversions: { conversions: [] },
	});

	useFocusEffect(
		useCallback(() => {
			if (!savedList.dataLoaded) {
				loadSavedConversions();
			}
			return () => {
				setSavedList({
					dataLoaded: false,
					savedConversions: savedList.savedConversions,
				});
			};
		}, [])
	);

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

	const displaySavedConversions = () => {
		if (!savedList.dataLoaded) {
			return <ActivityIndicator size="large" />;
		} else {
			const conversions = savedList.savedConversions.conversions;
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
					keyExtractor={(item) => item.title}
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
