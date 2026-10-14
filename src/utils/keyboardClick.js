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

export function isActivationKey(event) {
    return (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'Spacebar' ||
        event.keyCode === 13 ||
        event.keyCode === 32
    );
}

// Returns an onKeyDown handler that runs `activate(event)` for Enter/Space pressed on the
// element itself. Keys bubbling up from a nested control (an input inside a tile, a button in
// an accordion title) are ignored, otherwise typing a space there would fire this element too.
export function keyboardClick(activate) {
    return event => {
        if (
            event.target !== event.currentTarget ||
            event.repeat ||
            !isActivationKey(event)
        ) {
            return;
        }
        // Space would otherwise scroll the page.
        event.preventDefault();
        activate(event);
    };
}
