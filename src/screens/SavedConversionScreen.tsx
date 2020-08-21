import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	AsyncStorage,
	StyleSheet,
	ActivityIndicator,
} from 'react-native';
import ListSeperator from '../components/ListSeperator';

/*eslint-disable*/
const SavedConversionScreen = ({ route }) => {
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
			loadedConversionString;
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

	return <View>{displayConvertedRows()}</View>;
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
});

export default SavedConversionScreen;
