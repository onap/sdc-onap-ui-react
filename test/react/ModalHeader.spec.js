import React from 'react';
import ModalHeader from '../../src/components/ModalHeader.js';

import renderer from 'react-test-renderer';

describe('ModalHeader', () => {
	test('basic test', () => {
	    const header = renderer.create(<ModalHeader/>).toJSON();        
	    expect(header).toMatchSnapshot();
	});
});