import ConvertorScreen from '../src/screens/ConvertorScreen';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

describe('Basic screen render', () => {
	it('Should be able to find the button inputs', () => {
		const { getByA11yLabel, getByTestId } = render(<ConvertorScreen />);
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		expect(getByA11yLabel('Save conversion')).toBeTruthy();
		expect(getByA11yLabel('Add an input row')).toBeTruthy();
		expect(getByA11yLabel('Remove an input row')).toBeTruthy();
		expect(() => {
			getByTestId(`convertor-row-1`);
		}).toThrowError();
	});
});

describe('Can increase/decrease input rows', () => {
	it('cannot have less than 1 input row', () => {
		const { getByA11yLabel, getByTestId } = render(<ConvertorScreen />);
		const removeRowButton = getByA11yLabel('Remove an input row');
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		fireEvent.press(removeRowButton);
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
	});

	it('tapping add row only adds 1 row', () => {
		const { getByA11yLabel, getByTestId } = render(<ConvertorScreen />);
		const addRowButton = getByA11yLabel('Add an input row');
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		fireEvent.press(addRowButton);
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		expect(getByTestId(`convertor-row-1`)).toBeTruthy();
		expect(() => {
			getByTestId(`convertor-row-2`);
		}).toThrowError();
	});

	it('can remove a row after adding a row', () => {
		const { getByA11yLabel, getByTestId } = render(<ConvertorScreen />);
		const addRowButton = getByA11yLabel('Add an input row');
		const removeRowButton = getByA11yLabel('Remove an input row');
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		fireEvent.press(addRowButton);
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		expect(getByTestId(`convertor-row-1`)).toBeTruthy();
		fireEvent.press(removeRowButton);
		expect(getByTestId(`convertor-row-0`)).toBeTruthy();
		expect(() => {
			getByTestId(`convertor-row-1`);
		}).toThrowError();
	});
});
