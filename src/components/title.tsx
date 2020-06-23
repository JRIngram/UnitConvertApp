import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = (props: any) => {
    return (
        <Text style={styles.title}>{props.title}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      paddingBottom: 20,
      borderBottomColor: '#000',
      borderBottomWidth: 5
    }
});

export default Title;