import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import UnitConvertorRow from '../components/UnitConvertorRow';
import AsyncStorage from '@react-native-community/async-storage';

const ConvertorScreen = (): JSX.Element => {
	const [numberOfInputs, setNumberOfInputs] = useState(1);
	const [conversionTitle, setConversionTitle] = useState('');
	const [unitConversions, setUnitConversions] = useState({
		convertedRows: [{}],
	});
	const [errorMessage, setErrorMessage] = useState('');

	const updateUnitConversions = (
		conversionOutputValue: string,
		conversionOutputUnit: string,
		conversionName: string,
		rowKey: number
	) => {
		const newConversion = {
			rowKey: rowKey,
			outputValue: conversionOutputValue,
			outputUnit: conversionOutputUnit,
			itemName: conversionName,
		};
		const updatedConvertedRow = [];

		const forLoopLimit = Math.max(
			unitConversions.convertedRows.length - 1,
			rowKey
		);
		for (let i = 0; i <= forLoopLimit; i++) {
			if (i === rowKey) {
				updatedConvertedRow.push(newConversion);
			} else {
				updatedConvertedRow.push(unitConversions.convertedRows[i]);
			}
		}

		setUnitConversions({
			convertedRows: updatedConvertedRow,
		});
	};

	const getRows = (totalInputRows: number) => {
		const inputRows = [];
		for (let i = 0; i < totalInputRows; i++) {
			inputRows.push(
				i % 2 === 0 ? (
					<UnitConvertorRow
						key={i}
						rowKey={i}
						containerStyle="even"
						updateUnitConversions={(
							conversionOutputValue: string,
							conversionOutputUnit: string,
							conversionName: string,
							rowKey: number
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit,
								conversionName,
								rowKey
							);
						}}
					/>
				) : (
					<UnitConvertorRow
						key={i}
						rowKey={i}
						containerStyle="odd"
						updateUnitConversions={(
							conversionOutputValue: string,
							conversionOutputUnit: string,
							conversionName: string,
							rowKey: number
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit,
								conversionName,
								rowKey
							);
						}}
					/>
				)
			);
		}
		return inputRows;
	};

	const saveConversion = async () => {
		setErrorMessage('');
		try {
			if (!conversionTitle) {
				setErrorMessage('Conversion title must not be empty!');
				return;
			}

			const conversionToSave = {
				title: conversionTitle,
				unitConversions,
			};

			const loadedConversionString = await AsyncStorage.getItem(
				'saved_conversions'
			);

			if (loadedConversionString === null) {
				const conversions = {
					conversions: [conversionToSave],
				};

				await AsyncStorage.setItem(
					'saved_conversions',
					JSON.stringify(conversions)
				);
			} else {
				// GRAB CONVERSIONS array
				// push unitConversionsToSave to array
				const loadedConversions = await JSON.parse(
					loadedConversionString
				);
				if (loadedConversions.conversions) {
					const findDuplicateTitles = (
						title1: string,
						title2: string
					) => {
						return title1 === title2;
					};
					const duplicateTitles = loadedConversions.conversions.filter(
						(conversion: { title: string }) => {
							return findDuplicateTitles(
								conversion.title,
								conversionToSave.title
							);
						}
					);

					if (duplicateTitles.length > 0) {
						setErrorMessage(
							'A conversion with this title already exists!'
						);
					} else {
						loadedConversions.conversions.push(conversionToSave);
						await AsyncStorage.setItem(
							'saved_conversions',
							JSON.stringify(loadedConversions)
						);
					}
				}
			}
		} catch (e) {
			setErrorMessage(e);
		}
	};

	const rows = getRows(numberOfInputs);

	return (
		<>
			<ScrollView style={styles.conversionRowList}>
				<View style={styles.conversionTitleContainer}>
					<Text style={styles.errorMessage}>{errorMessage}</Text>
					<TextInput
						style={styles.titleText}
						placeholder="Conversion Title"
						onChangeText={async (value) => {
							setConversionTitle(value);
						}}
					/>
				</View>

				{rows}

				<View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.removeRowButton}
							onPress={() => {
								if (numberOfInputs > 1) {
									setNumberOfInputs(numberOfInputs - 1);
								}
							}}
						>
							<Text
								accessibilityRole="button"
								accessibilityLabel="Remove an input row"
								style={styles.buttonText}
							>
								Remove Input (-)
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.addRowButton}
							onPress={() =>
								setNumberOfInputs(numberOfInputs + 1)
							}
						>
							<Text
								accessibilityRole="button"
								accessibilityLabel="Add an input row"
								style={styles.buttonText}
							>
								Add Input (+)
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.saveConversionButton}
						onPress={async () => {
							await saveConversion();
						}}
					>
						<Text
							accessibilityRole="button"
							accessibilityLabel="Save conversion"
							style={styles.buttonText}
						>
							Save Conversion
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	conversionRowList: {
		backgroundColor: '#FFF',
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		height: '100%',
	},
	buttonText: {
		fontSize: 18,
		margin: 10,
		color: '#FFFFFF',
		textAlign: 'center',
	},
	removeRowButton: {
		flex: 1,
		backgroundColor: '#990000',
		margin: 10,
		borderRadius: 25,
	},
	addRowButton: {
		flex: 1,
		backgroundColor: '#007700',
		margin: 10,
		borderRadius: 25,
	},
	saveConversionButton: {
		flex: 1,
		backgroundColor: '#4da6ff',
		margin: 10,
		borderRadius: 25,
	},
	conversionTitleContainer: {
		margin: 10,
	},
	titleText: {
		height: '100%',
		borderColor: '#000',
		borderBottomWidth: 1,
		padding: 5,
		flex: 1,
		fontSize: 20,
	},
	errorMessage: {
		color: '#FF0000',
	},
	successMessage: {
		color: '#00FF00',
	},
});

export default ConvertorScreen;
