import React from 'react';
import Examples from './utils/Examples.js';
import Panel from '../src/components/Panel.js';
import Checkbox from '../src/components/Checkbox.js';
import HTMLBasic from '../node_modules/onap-ui-common/lib/html/components/panel/basic-panel.html';
let examples = {
    Basic: {
        jsx:
            <Panel>
                <h3>Panel</h3>
                <Checkbox label='filter-item' />
                <Checkbox checked label='filter-item-checked' />
            </Panel>,
        html: HTMLBasic
    }
};

const PanelStory = () => (
    <Examples examples={examples} />
);

export default PanelStory;
