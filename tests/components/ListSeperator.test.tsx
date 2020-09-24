import ListSeperator from '../../src/components/ListSeperator';
import React from 'react';
import { render } from '@testing-library/react-native';

describe('Rendering', () => {
	it('can render the list seperator', () => {
		const { getByTestId } = render(<ListSeperator />);
		expect(getByTestId('list-seperator')).toBeTruthy();
	});
});
