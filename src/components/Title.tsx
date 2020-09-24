import React, { ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';

type titleProps = {
	title: string;
};

const Title = (props: titleProps): ReactElement => {
	return <Text style={styles.title}>{props.title}</Text>;
};

const styles = StyleSheet.create({
	title: {
		fontSize: 30,
		paddingBottom: '2%',
		paddingLeft: '5%',
		borderBottomColor: '#000',
		borderBottomWidth: 5,
	},
});

export default Title;
