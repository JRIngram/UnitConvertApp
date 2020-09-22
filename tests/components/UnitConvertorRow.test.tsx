import UnitConvertorRow from '../../src/components/UnitConvertorRow';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

describe('Can render odd and even rows', () => {
	it('Can render an even row with the default values', () => {
		const key = 0;
		const { getByTestId, getByDisplayValue } = render(
			<UnitConvertorRow
				key={key}
				rowKey={key}
				containerStyle="even"
				updateUnitConversions={(
					conversionOutputValue: string,
					conversionOutputUnit: string,
					conversionName: string,
					rowKey: number
				) => {
					return true;
				}}
			/>
		);
		expect(getByTestId(`convertor-row-${key}`)).toBeTruthy();
		expect(getByTestId(`input-row-${key}`)).toBeTruthy();
		expect(getByTestId(`input-value-${key}`));
		expect(getByTestId(`input-unit-${key}`));
		expect(getByTestId(`output-row-${key}`));
		expect(getByTestId(`output-value-${key}`));
		expect(getByTestId(`output-unit-${key}`));
		expect(getByDisplayValue('1000')).toBeTruthy();
		expect(getByDisplayValue('1')).toBeTruthy();
	});
	it('Can render an odd row with the default values', () => {
		const key = 1;
		const { getByTestId, getByDisplayValue } = render(
			<UnitConvertorRow
				key={key}
				rowKey={key}
				containerStyle="even"
				updateUnitConversions={(
					conversionOutputValue: string,
					conversionOutputUnit: string,
					conversionName: string,
					rowKey: number
				) => {
					return true;
				}}
			/>
		);
		expect(getByTestId(`convertor-row-${key}`)).toBeTruthy();
		expect(getByTestId(`input-row-${key}`)).toBeTruthy();
		expect(getByTestId(`input-value-${key}`));
		expect(getByTestId(`input-unit-${key}`));
		expect(getByTestId(`output-row-${key}`));
		expect(getByTestId(`output-value-${key}`));
		expect(getByTestId(`output-unit-${key}`));
		expect(getByDisplayValue('1000')).toBeTruthy();
		expect(getByDisplayValue('1')).toBeTruthy();
	});
});
