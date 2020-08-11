import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SavedConversionButtonProps {
	title: string;
}

const SavedConversionsButton = (props: SavedConversionButtonProps) => {
	return (
		<View style={styles.savedConversionButtonView}>
			<TouchableOpacity>
				<View style={styles.savedConversionLayout}>
					<Text style={styles.buttonText}>{props.title}</Text>
					<Icon
						name="keyboard-arrow-right"
						size={30}
						color={'#555'}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 20,
		flex: 1,
		alignSelf: 'flex-end',
		marginLeft: 10,
	},
	savedConversionLayout: {
		flexDirection: 'row',
	},
	savedConversionButtonView: {
		backgroundColor: '#FFF',
		height: 75,
		justifyContent: 'center',
	},
});

export default SavedConversionsButton;
