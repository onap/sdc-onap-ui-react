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

import { keyboardClick } from '../../src/utils/keyboardClick.js';

const keyEvent = (key, overrides = {}) => {
	const el = {};
	return Object.assign(
		{ key, target: el, currentTarget: el, repeat: false, preventDefault: jest.fn() },
		overrides
	);
};

describe('keyboardClick', () => {
	test('Enter and Space activate and Space does not scroll', () => {
		const activate = jest.fn();
		const handler = keyboardClick(activate);
		const enter = keyEvent('Enter');
		const space = keyEvent(' ');
		handler(enter);
		handler(space);
		handler(keyEvent('Spacebar'));
		expect(activate).toHaveBeenCalledTimes(3);
		expect(activate).toHaveBeenCalledWith(enter);
		expect(space.preventDefault).toHaveBeenCalled();
	});

	test('other keys, auto-repeat and keys from a nested element are ignored', () => {
		const activate = jest.fn();
		const handler = keyboardClick(activate);
		const tab = keyEvent('Tab');
		handler(tab);
		handler(keyEvent('Enter', { repeat: true }));
		handler(keyEvent(' ', { target: {} }));
		expect(activate).not.toHaveBeenCalled();
		expect(tab.preventDefault).not.toHaveBeenCalled();
	});
});
