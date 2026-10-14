import React from 'react';
import ModalHeader from '../../src/components/ModalHeader.js';

import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('ModalHeader', () => {
	test('basic test', () => {
	    const header = renderer.create(<ModalHeader/>).toJSON();        
	    expect(header).toMatchSnapshot();
	});
});
describe('ModalHeader - close button', () => {
	test('the close icon is a button named Close that runs onClose from the keyboard', () => {
		const onClose = jest.fn();
		const close = mount(<ModalHeader onClose={onClose}/>).find('.sdc-modal__close-button');
		expect(close.prop('role')).toBe('button');
		expect(close.prop('aria-label')).toBe('Close');
		close.simulate('keyDown', { key: 'Enter' });
		expect(onClose).toHaveBeenCalledTimes(1);
	});
});
