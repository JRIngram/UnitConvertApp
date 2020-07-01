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
    // FOR TESTING
    // TODO ADD ABILITY TO DO FOR ALL OPTIONS
    //return pickerOptions;
    return addMassOptions();
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
    const [inputUnit, setInputUnit] = useState('g');
    const [outputValue, setOutputValue] = useState('0');
    const [outputUnit, setOutputUnit] = useState('kg')

        return ( 
            <>
                <View style={styles.container}>
                    <TextInput 
                        value={inputValue.toString()}
                        style={styles.textInputEditable}
                        editable={true} 
                        onChangeText={(value) => {
                            setInputValue(value);
                        }}
                    />
                    <Picker style={styles.dropdown} 
                        onValueChange={(itemValue) => { 
                                setInputUnit(itemValue.toString());
                                console.log(inputUnit);
                                // get a list of possible conversions
                                const possibilities = convert().from(inputUnit).possibilities();
                                
                                // TODO if current output unit is not in possibilities then change to default value
                                console.log(`conversion of ${inputValue} ${inputUnit} to ${outputUnit}: ${convert(inputValue).from(inputUnit).to(outputUnit)}`)
                                setOutputValue(convert(inputValue).from(inputUnit).to(outputUnit).toString());
                            }
                        }
                        selectedValue={inputUnit}
                    >
                        {addPossibilities()}
                    </Picker>
                </View>

                <View style={styles.container}>
                    <TextInput 
                        value={outputValue} 
                        style={styles.textInputNotEditable} 
                        editable={false}
                    />
                    <Picker 
                        style={styles.dropdown}
                        selectedValue={outputUnit}
                        onValueChange={(itemValue) => {
                            setOutputUnit(itemValue.toString());
                        }}
                    >
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