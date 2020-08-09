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
	const [unitConversions, setUnitConversions] = useState({
		conversionsToSave: [{}],
	});

	const updateUnitConversions = (
		conversionOutputValue: string,
		conversionOutputUnit: string,
		rowKey: number
	) => {
		const newConversion = {
			rowKey: rowKey,
			outputValue: conversionOutputValue,
			outputUnit: conversionOutputUnit,
		};
		const updatedConversionsToSave = [];

		const forLoopLimit = Math.max(
			unitConversions.conversionsToSave.length - 1,
			rowKey
		);
		console.log(
			`the length is ${unitConversions.conversionsToSave.length}`
		);
		for (let i = 0; i <= forLoopLimit; i++) {
			if (i === rowKey) {
				console.log(`ping, ${i} vs. ${rowKey}`);
				updatedConversionsToSave.push(newConversion);
			} else {
				console.log(`pong, ${i} vs. ${rowKey}`);
				console.log(unitConversions.conversionsToSave[i]);
				updatedConversionsToSave.push(
					unitConversions.conversionsToSave[i]
				);
			}
		}

		setUnitConversions({
			conversionsToSave: updatedConversionsToSave,
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
							rowKey: number
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit,
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
							rowKey: number
						) => {
							updateUnitConversions(
								conversionOutputValue,
								conversionOutputUnit,
								rowKey
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
								console.log('Unit conversions:');
								console.log(unitConversions);
								const unitConversionsToSave: string = JSON.stringify(
									unitConversions
								);
								await AsyncStorage.setItem(
									'saved_conversions',
									unitConversionsToSave
								);
								console.log('Data saved:');
								console.log(unitConversionsToSave);

								console.log(
									'************************ TEST ****************************'
								);
								const jsonValue = await AsyncStorage.getItem(
									'saved_conversions'
								);
								console.log(jsonValue);
								jsonValue != null
									? JSON.parse(jsonValue)
									: null;
								console.log(jsonValue);
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
