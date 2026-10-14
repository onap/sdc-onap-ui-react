import React from 'react';
import Notification from '../../src/components/Notification.js';

import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('Notification', () => {
	test('Notification - info', () => {
		const button = renderer.create(<Notification type='info' message='message' title='title' />).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Notification - success', () => {
		const button = renderer.create(<Notification type='success' message='message' title='title' />).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Notification - warning', () => {
		const button = renderer.create(<Notification type='warning' message='message' title='title' />).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Notification - error', () => {
		const button = renderer.create(<Notification type='error' message='message' title='title' />).toJSON();
		expect(button).toMatchSnapshot();
	});
});
describe('Notification - live region', () => {
	test('errors and warnings are alerts, info and success are status messages', () => {
		const role = type => mount(<Notification type={type} message='m' title='t' />).find('.sdc-notification').prop('role');
		expect(role('error')).toBe('alert');
		expect(role('warning')).toBe('alert');
		expect(role('info')).toBe('status');
		expect(role('success')).toBe('status');
	});
});
