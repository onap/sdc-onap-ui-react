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
	test('the close icon is a native button named Close that runs onClose', () => {
		const onClose = jest.fn();
		const close = mount(<ModalHeader onClose={onClose}/>).find('.sdc-modal__close-button');
		expect(close.type()).toBe('button');
		expect(close.prop('type')).toBe('button');
		expect(close.prop('aria-label')).toBe('Close');
		expect(close.prop('className')).toBe('svg-icon-wrapper sdc-modal__close-button-svg sdc-modal__close-button bottom');
		expect(close.childAt(0).prop('aria-hidden')).toBe('true');
		close.simulate('click');
		expect(onClose).toHaveBeenCalledTimes(1);
	});

	test('closeAriaLabel names the close button', () => {
		const close = mount(<ModalHeader onClose={() => {}} closeAriaLabel='Schließen'/>).find('.sdc-modal__close-button');
		expect(close.prop('aria-label')).toBe('Schließen');
	});
});
