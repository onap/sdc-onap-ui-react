import React from 'react';
import Accordion from '../../src/components/Accordion.js';

import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('Accordion', () => {
	test('Accordion - Default', () => {
		const accordion = renderer.create(<Accordion title='Accordion'>Accordion body</Accordion>).toJSON();
		expect(accordion).toMatchSnapshot();
	});
});
describe('Accordion - ARIA', () => {
	test('the header is a native button that controls the body', () => {
		const accordion = mount(<Accordion title='Accordion'>Accordion body</Accordion>);
		const header = accordion.find('.sdc-accordion-header');
		const body = accordion.find('.sdc-accordion-body');
		expect(header.type()).toBe('button');
		expect(header.prop('type')).toBe('button');
		expect(header.find('span.title').text()).toBe('Accordion');
		expect(header.prop('aria-expanded')).toBe('false');
		expect(body.prop('id')).toBeTruthy();
		expect(header.prop('aria-controls')).toBe(body.prop('id'));
	});

	test('activating the header toggles the body', () => {
		const accordion = mount(<Accordion title='Accordion'>Accordion body</Accordion>);
		accordion.find('.sdc-accordion-header').simulate('click');
		expect(accordion.find('.sdc-accordion-header').prop('aria-expanded')).toBe('true');
		expect(accordion.find('.sdc-accordion-body').hasClass('open')).toBe(true);
		accordion.find('.sdc-accordion-header').simulate('click');
		expect(accordion.find('.sdc-accordion-header').prop('aria-expanded')).toBe('false');
	});

	test('the chevron is a hidden span, valid inside the button', () => {
		const accordion = mount(<Accordion title='Accordion'>Accordion body</Accordion>);
		const chevron = accordion.find('.sdc-accordion-header .svg-icon-wrapper');
		expect(chevron.type()).toBe('span');
		expect(chevron.prop('aria-hidden')).toBe('true');
	});

	test('a disabled accordion has a disabled header button', () => {
		const accordion = mount(<Accordion title='Accordion' disabled>Accordion body</Accordion>);
		expect(accordion.find('.sdc-accordion').hasClass('disabled')).toBe(true);
		expect(accordion.find('.sdc-accordion-header').getDOMNode().disabled).toBe(true);
	});

	test('two accordions get different body ids', () => {
		const a = mount(<Accordion title='A'>a</Accordion>);
		const b = mount(<Accordion title='B'>b</Accordion>);
		expect(a.find('.sdc-accordion-body').prop('id')).not.toBe(b.find('.sdc-accordion-body').prop('id'));
	});
});
