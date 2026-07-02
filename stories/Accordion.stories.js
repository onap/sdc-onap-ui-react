import React from 'react';
import Examples from './utils/Examples.js';
import Accordion from '../src/components/Accordion.js';
import HTMLBasic from '../node_modules/onap-ui-common/lib/html/components/accordion/accordion-basic.html';
let examples = {
    Basic: {
        jsx: <Accordion title='Accordion Title'><div>Accordion body</div></Accordion>,
        html: HTMLBasic
    }
};

const Checkboxes = () => (
    <Examples examples={examples} />
);

export default Checkboxes;
