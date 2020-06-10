import React from 'react';
import { View, Text } from 'react-native';
import UnitConvertorInput from './UnitConvertorInput';

const UnitConvertorRow = () => {
    return (
        <View>
            <UnitConvertorInput editable={true} />
            <UnitConvertorInput editable={false} />
        </View>
    )
}

export default UnitConvertorRow;