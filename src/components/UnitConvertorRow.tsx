import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-community/picker';
const convert = require('convert-units')

const volume = convert().from('l').possibilities();
const mass = convert().from('kg').possibilities();

const addPossibilities = () => {
    const possibilities = mass.concat(volume);
    let pickerOptions = [];
    for(let i = 0; i < possibilities.length; i++){
        pickerOptions.push(<Picker.Item key={possibilities[i]} value={possibilities[i]} label={possibilities[i]}>{possibilities[i]}</Picker.Item>)
    }
    return pickerOptions;
}

const addMassOptions = () => {
    let pickerOptions = [];
    for(let i = 0; i < mass.length; i++){
        pickerOptions.push(<Picker.Item value={mass[i]} label={mass[i]}>{mass[i]}</Picker.Item>)
    }
    return pickerOptions;
}

const addVolumeOptions = () => {
    let pickerOptions = [];
    for(let i = 0; i < volume.length; i++){
        pickerOptions.push(<Picker.Item value={volume[i]} label={volume[i]}>{volume[i]}</Picker.Item>)
    }
    return pickerOptions;
}

const UnitConvertorRow = () => {
    const [inputValue, setInputValue] = useState('0');
    const [inputUnit, setInputUnit] = useState('mcg');
    const [outputValue, setOutputValue] = useState('0');

        return ( 
            <>
                <View style={styles.container}>
                    <TextInput 
                        value={inputValue.toString()}
                        style={styles.textInputEditable}
                        editable={true} 
                        onChangeText={(value) => {
                            setInputValue(value);
                            setOutputValue(value.toString());
                        }}
                    ></TextInput>
                    <Picker style={styles.dropdown} 
                        onValueChange={(value) => { 
                                setInputUnit(value.toString());
                                console.log(inputUnit);
                            }
                        }
                    >
                        {addPossibilities()}
                    </Picker>
                </View>

                <View style={styles.container}>
                    <TextInput value={outputValue} style={styles.textInputNotEditable} editable={false}></TextInput>
                    <Picker style={styles.dropdown}>
                        {addPossibilities()}
                    </Picker>
                </View>
            </>
        )
}


const styles = StyleSheet.create({
    textInputEditable: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#FFF',
        padding: 5,
        flex: 2
    },
    textInputNotEditable: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#EEE',
        padding: 5,
        flex: 2
    },
    dropdown: {
        width: 200,
        flex: 1
    },
    container: {
        flex:1, 
        flexDirection:"row",
        margin: 15
    }
});

export default UnitConvertorRow;