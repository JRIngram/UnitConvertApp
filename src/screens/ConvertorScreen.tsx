import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Title from '../components/title';
import UnitConvertorRow from '../components/UnitConvertorRow';

const ConvertorScreen = (): JSX.Element => {
	return (
		<ScrollView style={styles.container}>
			<Title title="Unit Convertor" />
			<UnitConvertorRow />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: '5%',
	},
});

export default ConvertorScreen;
