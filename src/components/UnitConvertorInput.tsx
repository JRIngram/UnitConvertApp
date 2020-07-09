import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
const convert = require('convert-units');

const UnitConvertorInput = (props: any) => {
	const liquid = convert().from('l').possibilities();
	const mass = convert().from('kg').possibilities();
	const possibilities = mass.concat(liquid);

	const addPossibilities = () => {
		const pickerOptions = [];
		for (let i = 0; i < possibilities.length; i++) {
			pickerOptions.push(
				<Picker.Item value={possibilities[i]} label={possibilities[i]}>
					{possibilities[i]}
				</Picker.Item>
			);
		}
		return pickerOptions;
	};

	const inputStyle = props.editable
		? styles.textInputEditable
		: styles.textInputNotEditable;

	return (
		<>
			<View style={styles.container}>
				<TextInput
					style={inputStyle}
					editable={props.editable}
				></TextInput>
				<Picker style={styles.dropdown}>{addPossibilities()}</Picker>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	textInputEditable: {
		height: 40,
		width: 200,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: '#FFF',
		padding: 5,
		flex: 2,
	},
	textInputNotEditable: {
		height: 40,
		width: 200,
		borderColor: 'gray',
		borderWidth: 1,
		backgroundColor: '#EEE',
		padding: 5,
		flex: 2,
	},
	dropdown: {
		width: 200,
		flex: 1,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
		margin: 15,
	},
});

export default UnitConvertorInput;
