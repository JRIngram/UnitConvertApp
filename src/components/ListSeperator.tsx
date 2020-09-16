import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

const ListSeperator: React.FC = (): ReactElement => {
	return <View style={styles.seperator}></View>;
};

const styles = StyleSheet.create({
	seperator: {
		borderBottomWidth: 1,
		borderColor: '#DDD',
	},
});

export default ListSeperator;
