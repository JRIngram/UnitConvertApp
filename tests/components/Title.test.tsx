import Title from '../../src/components/Title';
import { render } from '@testing-library/react-native';
import React from 'react';

describe('Can accept various inputs', () => {
	it('Can access Unit Convertor as a title', () => {
		const title = 'Unit Convertor';
		const { getByText } = render(<Title title={title} />);
		expect(getByText(title)).toBeTruthy();
	});

	it('Can accept an empty string as a title', () => {
		const title = '';
		const { getByText } = render(<Title title={title} />);
		expect(getByText(title)).toBeTruthy();
	});

	it('Can accept numbers as a title', () => {
		const title = '123';
		const { getByText } = render(<Title title={title} />);
		expect(getByText(title)).toBeTruthy();
	});

	it('Can accept special characters as a title', () => {
		const title = '!"?£';
		const { getByText } = render(<Title title={title} />);
		expect(getByText(title)).toBeTruthy();
	});

	it('Can accept a mix of alphanumerical and special characters as a title', () => {
		const title = 'hello mr 1 2 3!';
		const { getByText } = render(<Title title={title} />);
		expect(getByText(title)).toBeTruthy();
	});
});
