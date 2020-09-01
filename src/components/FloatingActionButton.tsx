import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IFloatingActionButton {
	icon: string;
	iconColor?: string;
	onPress: () => void;
}

const FloatingActionButton = ({
	icon,
	iconColor = '#000',
	onPress,
}: IFloatingActionButton): JSX.Element => {
	return (
		<TouchableOpacity style={styles.FAB} onPress={onPress}>
			<Icon name={icon} size={30} color={iconColor} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	FAB: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		position: 'absolute',
		bottom: '5%',
		right: '5%',
		height: 70,
		backgroundColor: '#A00',
		borderRadius: 50,
	},
});

export default FloatingActionButton;
