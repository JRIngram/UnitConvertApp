import ConvertorScreen from '../src/screens/ConvertorScreen';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('Basic screen render', () => {
	it('Should be able to find the title', () => {
		const { getByText } = render(<ConvertorScreen />);
		expect(getByText('Unit Convertor')).toBeTruthy();
	});

	it('Should be ablt to find the button inputs', () => {
		const { getByA11yLabel } = render(<ConvertorScreen />);
		expect(getByA11yLabel('Add an input row')).toBeTruthy();
		expect(getByA11yLabel('Remove an input row')).toBeTruthy();
	});
});
