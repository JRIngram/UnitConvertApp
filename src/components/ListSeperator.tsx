import React from 'react';
import { StyleSheet, View } from 'react-native';

const ListSeperator = (): JSX.Element => {
	return <View style={styles.seperator}></View>;
};

const styles = StyleSheet.create({
	seperator: {
		borderBottomWidth: 1,
		borderColor: '#DDD',
	},
});

export default ListSeperator;
