import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
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
		<ScrollView>
			<Title title="Unit Convertor" />
			{rows}
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.removeRowButton}
					onPress={() => {
						// TODO - DON'T ALLOW THE REMOVAL OF FINAL INPUT
						setNumberOfInputs(numberOfInputs - 1);
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
					onPress={() => setNumberOfInputs(numberOfInputs + 1)}
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
		</ScrollView>
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
	},
	addRowButton: {
		flex: 1,
		backgroundColor: '#007700',
		margin: 10,
	},
	buttonText: {
		fontSize: 18,
		margin: 10,
		color: '#FFFFFF',
	},
});

export default ConvertorScreen;
