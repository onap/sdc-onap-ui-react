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
describe('Accordion - keyboard and ARIA', () => {
	test('the header is a button that controls the body', () => {
		const accordion = mount(<Accordion title='Accordion'>Accordion body</Accordion>);
		const header = accordion.find('.sdc-accordion-header');
		const body = accordion.find('.sdc-accordion-body');
		expect(header.prop('role')).toBe('button');
		expect(header.prop('tabIndex')).toBe(0);
		expect(header.prop('aria-expanded')).toBe('false');
		expect(body.prop('id')).toBeTruthy();
		expect(header.prop('aria-controls')).toBe(body.prop('id'));
	});

	test('Enter and Space toggle the body', () => {
		const accordion = mount(<Accordion title='Accordion'>Accordion body</Accordion>);
		accordion.find('.sdc-accordion-header').simulate('keyDown', { key: 'Enter' });
		expect(accordion.find('.sdc-accordion-header').prop('aria-expanded')).toBe('true');
		expect(accordion.find('.sdc-accordion-body').hasClass('open')).toBe(true);
		accordion.find('.sdc-accordion-header').simulate('keyDown', { key: ' ' });
		expect(accordion.find('.sdc-accordion-header').prop('aria-expanded')).toBe('false');
	});

	test('two accordions get different body ids', () => {
		const a = mount(<Accordion title='A'>a</Accordion>);
		const b = mount(<Accordion title='B'>b</Accordion>);
		expect(a.find('.sdc-accordion-body').prop('id')).not.toBe(b.find('.sdc-accordion-body').prop('id'));
	});
});
