import UnitConvertorRow from '../../src/components/UnitConvertorRow';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('Can render odd and even rows', () => {
	it('Can render an even row', () => {
		const key = 0;
		const { getByTestId } = render(
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
	});
	it('Can render an odd row', () => {
		const key = 1;
		const { getByTestId } = render(
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
	});
});
