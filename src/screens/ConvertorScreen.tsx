import React, { useState } from 'react';
import { StyleSheet, ScrollView, Button } from 'react-native';
import Title from '../components/title';
import UnitConvertorRow from '../components/UnitConvertorRow';

const getRows = (totalInputRows: number) => {
	const inputRows = [];
	for (let i = 0; i < totalInputRows; i++) {
		inputRows.push(<UnitConvertorRow />);
	}
	return inputRows;
};

const ConvertorScreen = (): JSX.Element => {
	const [numberOfInputs, setNumberOfInputs] = useState(1);
	const rows = getRows(numberOfInputs);

	return (
		<ScrollView style={styles.container}>
			<Title title="Unit Convertor" />
			{rows}
			<Button
				onPress={() => setNumberOfInputs(numberOfInputs + 1)}
				title="Add Input (+)"
				color="#009900"
			/>
			<Button
				onPress={() => {
					// TODO - DON'T ALLOW THE REMOVAL OF FINAL INPUT
					setNumberOfInputs(numberOfInputs - 1);
				}}
				title="Remove Input (-)"
				color="#990000"
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: '5%',
	},
});

export default ConvertorScreen;
