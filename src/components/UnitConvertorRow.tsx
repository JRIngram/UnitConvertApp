import React, { useState, useEffect, ReactElement } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
// TO-DO perform ES2015 Import style
/* eslint-disable */
const convert = require('convert-units');
/* eslint-enable */

const volume = convert().from('l').possibilities();
const mass = convert().from('kg').possibilities();

const addInputUnitOptions = () => {
	const possibilities = mass.concat(volume);
	const pickerOptions = [];
	for (let i = 0; i < possibilities.length; i++) {
		pickerOptions.push(
			//TODO make label the full name rather than the unit name
			<Picker.Item
				key={possibilities[i]}
				value={possibilities[i]}
				label={possibilities[i]}
			>
				{possibilities[i]}
			</Picker.Item>
		);
	}
	return pickerOptions;
};

export interface unitConvertorRowProps {
	rowKey: number;
	containerStyle: string;
	updateUnitConversions: (
		conversionOutputValue: string,
		conversionOutputUnit: string,
		conversionName: string,
		rowKey: number
	) => void;
}

const UnitConvertorRow: React.FC<unitConvertorRowProps> = (
	props: unitConvertorRowProps
): ReactElement => {
	const [inputUnit, setInputUnit] = useState('g');
	const [inputValue, setInputValue] = useState('1000');
	const [outputUnit, setOutputUnit] = useState('kg');
	const [outputValue, setOutputValue] = useState('1');
	const [itemName, setItemName] = useState('');

	const addOutputUnitOptions = () => {
		const pickerOptions = [];
		const unitType = mass.includes(inputUnit) ? mass : volume;

		for (let i = 0; i < unitType.length; i++) {
			pickerOptions.push(
				//TODO make label the full name rather than the unit name
				<Picker.Item
					value={unitType[i]}
					label={unitType[i]}
					key={unitType[i]}
				>
					{unitType[i]}
				</Picker.Item>
			);
		}
		return pickerOptions;
	};

	const isValidConversion = () => {
		const isInputUnitMass = mass.includes(inputUnit);
		const isOutputUnitMass = mass.includes(outputUnit);
		return isInputUnitMass === isOutputUnitMass;
	};

	const enforceValidConversion = () => {
		const isInputUnitMass = mass.includes(inputUnit);
		const isOutputUnitMass = mass.includes(outputUnit);
		if (isInputUnitMass && !isOutputUnitMass) {
			setOutputUnit('kg');
		} else if (!isInputUnitMass && isOutputUnitMass) {
			setOutputUnit('dl');
		}
	};

	const convertUnits = async () => {
		if (isValidConversion()) {
			const convertedValue = convert(inputValue)
				.from(inputUnit)
				.to(outputUnit)
				.toString();
			setOutputValue(convertedValue);
		} else {
			enforceValidConversion();
		}
	};

	useEffect(() => {
		convertUnits();
		props.updateUnitConversions(
			outputValue,
			outputUnit,
			itemName,
			props.rowKey
		);
	}, [inputUnit, inputValue, outputUnit, outputValue, itemName]);

	const containerStyle =
		props.containerStyle === 'odd'
			? styles.oddContainer
			: styles.evenContainer;

	return (
		<View style={containerStyle} testID={`convertor-row-${props.rowKey}`}>
			<View
				style={styles.formContainer}
				testID={`input-row-${props.rowKey}`}
			>
				<TextInput
					value={inputValue.toString()}
					style={styles.textInputEditable}
					editable={true}
					testID={`input-value-${props.rowKey}`}
					onChangeText={(value) => {
						setInputValue(value);
						props.updateUnitConversions(
							outputValue,
							outputUnit,
							itemName,
							props.rowKey
						);
					}}
				/>
				<Picker
					style={styles.dropdown}
					testID={`input-unit-${props.rowKey}`}
					onValueChange={(itemValue) => {
						setInputUnit(itemValue.toString());
						props.updateUnitConversions(
							outputValue,
							outputUnit,
							itemName,
							props.rowKey
						);
					}}
					selectedValue={inputUnit}
				>
					{addInputUnitOptions()}
				</Picker>
			</View>

			<View
				style={styles.formContainer}
				testID={`output-row-${props.rowKey}`}
			>
				<TextInput
					value={outputValue}
					style={styles.textInputNotEditable}
					editable={false}
					testID={`output-value-${props.rowKey}`}
				/>
				<Picker
					style={styles.dropdown}
					selectedValue={outputUnit}
					testID={`output-unit-${props.rowKey}`}
					onValueChange={(itemValue) => {
						setOutputUnit(itemValue.toString());
						props.updateUnitConversions(
							outputValue,
							outputUnit,
							itemName,
							props.rowKey
						);
					}}
				>
					{addOutputUnitOptions()}
				</Picker>
			</View>
			<View style={styles.formContainer}>
				<TextInput
					style={styles.textInputEditable}
					placeholder="Item name"
					onChangeText={(value: string) => {
						setItemName(value);
						props.updateUnitConversions(
							outputValue,
							outputUnit,
							itemName,
							props.rowKey
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	textInputEditable: {
		height: '100%',
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: '#FFF',
		padding: 5,
		flex: 2,
		fontSize: 16,
	},
	textInputNotEditable: {
		height: '100%',
		width: 200,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: '#EEE',
		padding: 5,
		flex: 2,
		fontSize: 16,
	},
	dropdown: {
		flex: 1,
	},
	formContainer: {
		flex: 1,
		flexDirection: 'row',
		margin: 15,
	},
	evenContainer: {
		backgroundColor: '#FFF',
	},
	oddContainer: {
		backgroundColor: '#DDD',
	},
});

export default UnitConvertorRow;
