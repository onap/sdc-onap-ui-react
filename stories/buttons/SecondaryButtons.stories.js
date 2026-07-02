import React from 'react';
import Examples from '../utils/Examples.js';

import ReactButton from '../../src/components/Button.js';

import SecondaryButton from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary.html';
import SecondaryButtonDisabled from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-disabled.html';
import ExtraSmall from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-extra-small.html';
import Small from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-small.html';
import Medium from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-medium.html';
import Large from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-large.html';
import Auto from '../../node_modules/onap-ui-common/lib/html/components/button/button-secondary-auto.html';

let examples = {
	'Secondary Default': {
		jsx: <ReactButton btnType='secondary' onClick={() => {}}>Click Me</ReactButton>,
		html: SecondaryButton
	},
	'Secondary Disabled': {
		jsx: <ReactButton btnType='secondary' onClick={() => {}} disabled>Click Me</ReactButton>,
		html: SecondaryButtonDisabled,
	},
	'Extra Small': {
		jsx: <ReactButton btnType='secondary' size='x-small' onClick={() => {}}>Click Me</ReactButton>,
		html: ExtraSmall
	},
	'Small': {
		jsx: <ReactButton btnType='secondary' size='small' onClick={() => {}}>Click Me</ReactButton>,
		html: Small,
	},
	'Medium': {
		jsx: <ReactButton btnType='secondary' size='medium' onClick={() => {}}>Click Me</ReactButton>,
		html: Medium
	},
	'Large': {
		jsx: <ReactButton btnType='secondary' size='large' onClick={() => {}}>Click Me</ReactButton>,
		html: Large,
	},
	'Auto Sizing': {
		jsx: <ReactButton btnType='secondary' size='default' onClick={() => {}}>Click Me</ReactButton>,
		html: Auto,
	}
};

const DefaultButtons = () => (
	<Examples examples={examples} />
);

export default DefaultButtons;
