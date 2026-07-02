import React from 'react';
import Examples from './utils/Examples.js';

import Radio from '../src/components/Radio';
import HTMLRadioChecked from '../node_modules/onap-ui-common/lib/html/components/radio/radio-checked.html';
import HTMLRadioUnchecked from '../node_modules/onap-ui-common/lib/html/components/radio/radio-unchecked.html';
import HTMLRadioDisabled from '../node_modules/onap-ui-common/lib/html/components/radio/radio-disabled.html';
import HTMLRadioDisabledChecked from '../node_modules/onap-ui-common/lib/html/components/radio/radio-disabled-checked.html';

let examples = {
	Checked: {
		jsx: <Radio name='grp1' checked={true} label='This is the radio label' value='myVal' onChange={()=>{}} data-test-id='myradio-1' inputRef={() => {} } />,
		html: HTMLRadioChecked
	},
	Unchecked: {
		jsx: <Radio name='grp2' label='This is the radio label' value='myVal' onChange={()=>{}} data-test-id='myradio-2' inputRef={() => {} } />,
		html: HTMLRadioUnchecked
	},
	Disabled: {
		jsx: <Radio name='grp3' label='This is the radio label' disabled={true} value='myVal' onChange={()=>{}} data-test-id='myradio-4' inputRef={() => {} } />,
		html: HTMLRadioDisabled
	},
	'Disabled and Checked': {
		jsx: <Radio name='grp4' label='This is the radio label' disabled={true} checked={true} value='myVal' onChange={()=>{}} data-test-id='myradio-4' inputRef={() => {} } />,
		html: HTMLRadioDisabledChecked
	}
};

const Radios = () => (
	<Examples examples={examples} />
);

export default Radios;
