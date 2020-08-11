import React from 'react';
import { View, Text, Modal } from 'react-native';

const TestScreen = ({ route }) => {
	return (
		<View>
			<Text>I am a test</Text>
			<Text>And I bring a message!</Text>
			<Text>Nothing more...</Text>
			<Text>And the message is: {route.params.title}</Text>
		</View>
	);
};

export default TestScreen;
