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
	test('a clickable icon is a named native button', () => {
		const onClick = jest.fn();
		const host = mount(<SVGIcon name='close' onClick={onClick} ariaLabel='Close' />).find('.svg-icon-wrapper');
		expect(host.type()).toBe('button');
		expect(host.prop('type')).toBe('button');
		expect(host.prop('aria-label')).toBe('Close');
		expect(host.prop('aria-hidden')).toBeUndefined();
		expect(host.prop('role')).toBeUndefined();
		expect(host.prop('tabIndex')).toBeUndefined();
		host.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('a disabled clickable icon is a disabled button', () => {
		const host = mount(<SVGIcon name='close' onClick={() => {}} disabled />).find('.svg-icon-wrapper');
		expect(host.type()).toBe('button');
		expect(host.getDOMNode().disabled).toBe(true);
	});

	test('a decorative icon is a div hidden from assistive technology', () => {
		const host = mount(<SVGIcon name='close' />).find('.svg-icon-wrapper');
		expect(host.type()).toBe('div');
		expect(host.prop('aria-hidden')).toBe('true');
	});

	test('an icon with a label stays visible to assistive technology', () => {
		const host = mount(<SVGIcon name='close' label='Field is required' />).find('.svg-icon-wrapper');
		expect(host.prop('aria-hidden')).toBeUndefined();
	});

	test('attributes passed by the consumer win over the defaults', () => {
		const host = mount(<SVGIcon name='close' onClick={() => {}} aria-label='Remove row' data-test-id='remove' />).find('.svg-icon-wrapper');
		expect(host.prop('aria-label')).toBe('Remove row');
		expect(host.prop('data-test-id')).toBe('remove');
	});
});
