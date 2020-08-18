import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ISavedConversionsButton {
	title: string;
	onPress: () => void;
}

const SavedConversionsButton = (props: ISavedConversionsButton) => {
	return (
		<View style={styles.savedConversionButtonView}>
			<TouchableOpacity
				onPress={() => {
					props.onPress();
				}}
			>
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
