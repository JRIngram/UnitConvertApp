import React, { useState, useEffect } from 'react';
import {
	ActivityIndicator,
	Alert,
	AsyncStorage,
	FlatList,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import ListSeperator from '../components/ListSeperator';
import FloatingActionButton from '../components/FloatingActionButton';
import { NavigationContainer } from '@react-navigation/native';

/*eslint-disable*/
const SavedConversionScreen = ({ route, navigation }) => {
	/*eslint-enable*/
	const [dataLoaded, setDataLoaded] = useState(false);
	const [convertedRows, setConvertedRows] = useState([]);

	useEffect(() => {
		if (!dataLoaded) {
			/*eslint-disable*/
			loadConversion(route.params.title);
			/*eslint-enable*/
		}
	});

	const loadConversion = async (conversionTitle: string) => {
		let loadedConversions = { conversions: [] };
		let conversion = null;

		const loadedConversionString = await AsyncStorage.getItem(
			'saved_conversions'
		);

		if (loadedConversionString != null) {
			loadedConversions = await JSON.parse(loadedConversionString);
			conversion = loadedConversions.conversions.filter((conversion) => {
				if (conversion.title) {
					return conversion.title === conversionTitle;
				}
				return false;
			})[0];
			const convertedRows = conversion.unitConversions.convertedRows;
			setDataLoaded(true);
			setConvertedRows(convertedRows);
		}
	};

	const displayConvertedRows = () => {
		if (convertedRows.length === 0) {
			return <ActivityIndicator size="large" />;
		} else {
			return (
				<FlatList
					data={convertedRows}
					renderItem={({ item }) => {
						return (
							<View style={styles.textContainer}>
								<Text style={styles.text}>
									{item.outputValue}
									{item.outputUnit} {item.itemName}
								</Text>
							</View>
						);
					}}
					keyExtractor={(item, index) => {
						return `${item.itemName}-${index}`;
					}}
					ItemSeparatorComponent={ListSeperator}
				/>
			);
		}
	};

	return (
		<View style={styles.listContainer}>
			{displayConvertedRows()}
			<FloatingActionButton
				icon="delete-forever"
				onPress={async () => {
					/* eslint-disable */
					const { title } = route.params;
					/* eslint-enable */
					Alert.alert(
						`Delete ${title}?`,
						`You are about to delete ${title}! Are you sure?\nThis cannot be undone.`,
						[
							{
								text: 'Cancel',
								style: 'cancel',
							},
							{
								text: `Delete ${title}`,
								onPress: async () => {
									let loadedConversions = { conversions: [] };

									const loadedConversionString = await AsyncStorage.getItem(
										'saved_conversions'
									);

									if (loadedConversionString != null) {
										loadedConversions = await JSON.parse(
											loadedConversionString
										);

										loadedConversions.conversions = loadedConversions.conversions.filter(
											(conversion) => {
												if (
													conversion.title === title
												) {
													return false;
												}
												return true;
											}
										);

										await AsyncStorage.setItem(
											'saved_conversions',
											JSON.stringify(loadedConversions)
										);
									}
									/* eslint-disable */
									navigation.goBack();
									/* eslint-enable */
								},
							},
						],
						{ cancelable: true }
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
	},
	textContainer: {
		backgroundColor: '#FFF',
		height: 75,
		justifyContent: 'center',
		paddingLeft: 20,
	},
	listContainer: {
		height: '100%',
	},
});

export default SavedConversionScreen;
