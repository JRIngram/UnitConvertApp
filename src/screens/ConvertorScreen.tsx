import React from 'react';
import { TextInput, StyleSheet, ScrollView } from 'react-native';
import Title from '../components/title';
import UnitConvertorInput from '../components/UnitConvertorInput'
import UnitConvertorRow from '../components/UnitConvertorRow';

const ConvertorScreen = () => {
    return (
      <ScrollView style={styles.container}>
        <Title title="Unit Convertor" />
        <UnitConvertorRow />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
    },
    title: {
      fontSize: 20
    }
  });

export default ConvertorScreen;