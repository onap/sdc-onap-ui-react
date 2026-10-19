import React from 'react';
import Button from '../../src/components/Button.js';

import renderer from 'react-test-renderer';

describe('Button', () => {
	test('Button - Default - Primary', () => {
		const button = renderer.create(<Button>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - Primary - Disabled', () => {
		const button = renderer.create(<Button disabled>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - White', () => {
		const button = renderer.create(<Button color='white'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - Gray', () => {
		const button = renderer.create(<Button color='gray'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - Positive', () => {
		const button = renderer.create(<Button color='positive'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - Negative', () => {
		const button = renderer.create(<Button color='negative'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Default - Warning', () => {
		const button = renderer.create(<Button color='warning'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Outline - Primary', () => {
		const button = renderer.create(<Button btnType='outline'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Outline - Gray', () => {
		const button = renderer.create(<Button btnType='outline' color='gray'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Outline - Positive', () => {
		const button = renderer.create(<Button btnType='outline' color='positive'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Outline - Negative', () => {
		const button = renderer.create(<Button btnType='outline' color='negative'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Link - Primary', () => {
		const button = renderer.create(<Button btnType='link' color='primary'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Link - Primary - Disabled', () => {
		const button = renderer.create(<Button btnType='link' color='primary' disabled>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Link - Primary - With Icon', () => {
		const button = renderer.create(<Button btnType='link' color='primary' iconName='plus'>Click Me</Button>).toJSON();
		expect(button).toMatchSnapshot();
	});

	test('Button - Tertiary', () => {
		const button = renderer.create(<Button btnType='tertiary'>Add Property</Button>).toJSON();
		expect(button.props.className.split(/\s+/)).toEqual(expect.arrayContaining(['sdc-button', 'sdc-button__tertiary']));
		expect(button.children).toEqual(['Add Property']);
		expect(button).toMatchSnapshot();
	});

	test('Button - Tertiary - Disabled', () => {
		const button = renderer.create(<Button btnType='tertiary' disabled>Add Property</Button>).toJSON();
		expect(button.props.disabled).toBe(true);
		expect(button).toMatchSnapshot();
	});

	test('Button - Tertiary - With Icon', () => {
		const button = renderer.create(<Button btnType='tertiary' iconName='plus'>Add Property</Button>).toJSON();
		// onap-ui-common's tertiary rules target this wrapper: icon first, then the label.
		const [wrapper] = button.children;
		expect(wrapper.props.className.split(/\s+/)).toEqual(expect.arrayContaining(['svg-icon-wrapper', 'right']));
		expect(wrapper.children.map(c => c.type)).toEqual(['svg', 'span']);
		expect(wrapper.children[1].props.className.trim()).toBe('svg-icon-label');
		expect(wrapper.children[1].children).toEqual(['Add Property']);
		expect(button).toMatchSnapshot();
	});

});
