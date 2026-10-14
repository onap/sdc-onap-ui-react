/*-
 * ============LICENSE_START=======================================================
 * onap-ui-react
 * ================================================================================
 * Copyright (C) 2026 Deutsche Telekom AG.
 * ================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============LICENSE_END=========================================================
 */

import React from 'react';
import { mount } from 'enzyme';
import SVGIcon from '../../src/components/SVGIcon.js';

describe('SVGIcon', () => {
	test('a clickable icon is a named, focusable button', () => {
		const onClick = jest.fn();
		const icon = mount(<SVGIcon name='close' onClick={onClick} ariaLabel='Close' />);
		const host = icon.find('.svg-icon-wrapper');
		expect(host.prop('role')).toBe('button');
		expect(host.prop('tabIndex')).toBe(0);
		expect(host.prop('aria-label')).toBe('Close');
		expect(host.prop('aria-hidden')).toBeUndefined();
	});

	test('Enter and Space activate a clickable icon', () => {
		const onClick = jest.fn();
		const host = mount(<SVGIcon name='close' onClick={onClick} />).find('.svg-icon-wrapper');
		host.simulate('keyDown', { key: 'Enter' });
		host.simulate('keyDown', { key: ' ' });
		host.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(3);
	});

	test('a disabled icon leaves the tab order and ignores mouse and keyboard', () => {
		const onClick = jest.fn();
		const host = mount(<SVGIcon name='close' onClick={onClick} disabled />).find('.svg-icon-wrapper');
		expect(host.prop('tabIndex')).toBe(-1);
		expect(host.prop('aria-disabled')).toBe('true');
		host.simulate('click');
		host.simulate('keyDown', { key: 'Enter' });
		expect(onClick).not.toHaveBeenCalled();
	});

	test('a decorative icon is hidden from assistive technology', () => {
		const host = mount(<SVGIcon name='close' />).find('.svg-icon-wrapper');
		expect(host.prop('aria-hidden')).toBe('true');
		expect(host.prop('role')).toBeUndefined();
		expect(host.prop('tabIndex')).toBeUndefined();
	});

	test('an icon with a label stays visible to assistive technology', () => {
		const host = mount(<SVGIcon name='close' label='Field is required' />).find('.svg-icon-wrapper');
		expect(host.prop('aria-hidden')).toBeUndefined();
	});

	test('attributes passed by the consumer win over the defaults', () => {
		const host = mount(<SVGIcon name='close' onClick={() => {}} aria-label='Remove row' />).find('.svg-icon-wrapper');
		expect(host.prop('aria-label')).toBe('Remove row');
	});
});
