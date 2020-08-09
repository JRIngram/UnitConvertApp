import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import UnitConvertorRow from '../components/UnitConvertorRow';
import AsyncStorage from '@react-native-community/async-storage';

const ConvertorScreen = (): JSX.Element => {
	const [numberOfInputs, setNumberOfInputs] = useState(1);
	const [unitConversions, setUnitConversions] = useState({});

	const updateUnitConversions = async (
		conversionOutputValue: number,
		conversionOutputUnit: string
	) => {
		setUnitConversions({
			conversionOutputValue,
			conversionOutputUnit,
		});
	};

	const getRows = (totalInputRows: number) => {
		const inputRows = [];
		for (let i = 0; i < totalInputRows; i++) {
			inputRows.push(
				i % 2 === 0 ? (
					<UnitConvertorRow
						key={i}
						containerStyle="even"
						updateUnitConversions={(
							conversionOutputValue: number,
							conversionOutputUnit: string
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit
							);
						}}
					/>
				) : (
					<UnitConvertorRow
						containerStyle="odd"
						updateUnitConversions={(
							conversionOutputValue: number,
							conversionOutputUnit: string
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit
							);
						}}
					/>
				)
			);
		}
		return inputRows;
	};
	const rows = getRows(numberOfInputs);

	return (
		<>
			<ScrollView>
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
							try {
								console.log('Saving test data...');
								const unitConversionsToSave: string = JSON.stringify(
									unitConversions
								);
								await AsyncStorage.setItem(
									'saved_conversions',
									unitConversionsToSave
								);
								console.log('Data saved!');
							} catch (e) {
								// saving error
							}
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
					{/* <TouchableOpacity
						style={styles.saveConversionButton}
						onPress={async () => {
							try {
								console.log('reading data');
								console.log(
									await AsyncStorage.getItem('test_data')
								);
							} catch (e) {
								// error reading value
								console.log('Button go bang');
							}
						}}
					>
						<Text
							accessibilityRole="button"
							accessibilityLabel="Read conversion"
							style={styles.buttonText}
						>
							Read Conversion
						</Text>
					</TouchableOpacity> */}
				</View>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		height: '100%',
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
	buttonText: {
		fontSize: 18,
		margin: 10,
		color: '#FFFFFF',
		textAlign: 'center',
	},
});

export default ConvertorScreen;
