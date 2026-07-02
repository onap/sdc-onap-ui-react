import React from 'react';
import Examples from './utils/Examples.js';
import {default as TabsComp} from '../src/components/Tabs.js';
import Tab from '../src/components/Tab.js';
import HTMLTabsHeader from '../node_modules/onap-ui-common/lib/html/components/tabs/tabs-header.html';
import HTMLTabsDisabled from '../node_modules/onap-ui-common/lib/html/components/tabs/tabs-disabled.html';
import HTMLTabsMenu from '../node_modules/onap-ui-common/lib/html/components/tabs/tabs-menu.html';

let examples = {
	'Menu Tabs': {
		jsx: <TabsComp type='menu' activeTab='1' onTabClick={(tabId) => {console.log(tabId);}}>
			<Tab title='tab 1' tabId='1'>
				<div>This is the active tab content</div>
			</Tab>
			<Tab title='tab 2' tabId='2' />
			<Tab title='tab 3' tabId='3' />
		</TabsComp>,
		html: HTMLTabsMenu
	},
	'Header Tabs': {
		jsx: <TabsComp type='header' activeTab='1' onTabClick={(tabId) => {console.log(tabId);}}>
			<Tab title='tab 1' tabId='1'>
				<div>This is the active tab content</div>
			</Tab>
			<Tab title='tab 2' tabId='2' />
			<Tab title='tab 3' tabId='3' />
		</TabsComp>,
		html: HTMLTabsHeader
	},
	'Disabled Tabs': {
		jsx: (
			<TabsComp type='header' activeTab='1' onTabClick={(tabId) => {console.log(tabId);}}>
				<Tab title='tab 1' tabId='1'>
					<div>This is the active tab content</div>
				</Tab>
				<Tab title='tab 2' tabId='2' disabled/>
				<Tab title='tab 3' tabId='3' disabled/>
			</TabsComp>
		),
		html: HTMLTabsDisabled
	}
};

const Tabs = () => (
	<Examples examples={examples} />
);

export default Tabs;
