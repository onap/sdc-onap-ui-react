import React from 'react';
import Tab from '../../src/components/Tab.js';
import Tabs from '../../src/components/Tabs.js';

import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

class TabsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tabId: '1'};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(val) {
		this.setState({tabId: val});
	}

	render() {
		return (
			<form >
				<fieldset disabled={this.props.disabled}>
					<Tabs ref={(tabs) => this.tabsInst = tabs} activeTab={this.state.tabId} onTabClick={this.handleChange} >
						<Tab title='tab 1' tabId='1' data-test-id='1'>Tab #1</Tab>
						<Tab title='tab 2' tabId='2' data-test-id='2'>Tab #2</Tab>
						<Tab title='tab 3'  tabId='3' data-test-id='3'>Tab #3</Tab>
					</Tabs>
				</fieldset>

			</form>
		);
	}
}

describe('Tabs', () => {

	test('Tabs - basic rendering', () => {
		const tabs = renderer.create(<TabsForm disabled={false} />).toJSON();
		expect(tabs).toMatchSnapshot();
	});

	test('Tabs - when active tab id is changed, the respective tab is shown', () => {
		const tabs = mount(<TabsForm disabled={false} />);
		expect(tabs.instance().tabsInst.props.activeTab).toEqual('1');
		expect(tabs.find('.sdc-tab-content').text()).toEqual('Tab #1');
		expect(tabs.find('li[data-test-id="1"]').hasClass('sdc-tab-active')).toBeTruthy();
		tabs.find('li[data-test-id="2"]').simulate('click');
		expect(tabs.instance().tabsInst.props.activeTab).toEqual('2');
		expect(tabs.find('li[data-test-id="2"]').hasClass('sdc-tab-active')).toBeTruthy();
		expect(tabs.find('li[data-test-id="1"]').hasClass('sdc-tab-active')).not.toBeTruthy();
		expect(tabs.find('.sdc-tab-content').text()).toEqual('Tab #2');
	});

});

class KeyboardTabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tabId: '1'};
	}

	render() {
		return (
			<Tabs activeTab={this.state.tabId} onTabClick={tabId => this.setState({tabId})}>
				<Tab title='tab 1' tabId='1' data-test-id='1'>Tab #1</Tab>
				<Tab title='tab 2' tabId='2' data-test-id='2' disabled={this.props.disableSecond}>Tab #2</Tab>
				<Tab title='tab 3' tabId='3' data-test-id='3'>Tab #3</Tab>
			</Tabs>
		);
	}
}

describe('Tabs - ARIA tab pattern', () => {
	let container;
	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});
	afterEach(() => {
		document.body.removeChild(container);
	});

	const tab = (tabs, id) => tabs.find(`li[data-test-id="${id}"]`);
	const onTabClick = jest.fn();
	beforeEach(() => onTabClick.mockClear());

	test('only the selected tab is in the tab order and it labels the panel', () => {
		const tabs = mount(<KeyboardTabs />);
		expect(tab(tabs, '1').prop('aria-selected')).toBe('true');
		expect(tab(tabs, '1').prop('tabIndex')).toBe(0);
		expect(tab(tabs, '2').prop('aria-selected')).toBe('false');
		expect(tab(tabs, '2').prop('tabIndex')).toBe(-1);
		const panel = tabs.find('.sdc-tab-content');
		expect(tab(tabs, '1').prop('aria-controls')).toBe(panel.prop('id'));
		expect(panel.prop('aria-labelledby')).toBe(tab(tabs, '1').prop('id'));
		expect(tab(tabs, '2').prop('aria-controls')).toBeUndefined();
	});

	test('ArrowRight selects and focuses the next tab, wrapping at the end', () => {
		const tabs = mount(<KeyboardTabs />, {attachTo: container});
		tab(tabs, '1').simulate('keyDown', {key: 'ArrowRight'});
		expect(tabs.state('tabId')).toBe('2');
		expect(document.activeElement.getAttribute('data-test-id')).toBe('2');
		tab(tabs, '2').simulate('keyDown', {key: 'ArrowRight'});
		tab(tabs, '3').simulate('keyDown', {key: 'ArrowRight'});
		expect(tabs.state('tabId')).toBe('1');
	});

	test('ArrowLeft, Home and End move the selection', () => {
		const tabs = mount(<KeyboardTabs />, {attachTo: container});
		tab(tabs, '1').simulate('keyDown', {key: 'ArrowLeft'});
		expect(tabs.state('tabId')).toBe('3');
		tab(tabs, '3').simulate('keyDown', {key: 'Home'});
		expect(tabs.state('tabId')).toBe('1');
		tab(tabs, '1').simulate('keyDown', {key: 'End'});
		expect(tabs.state('tabId')).toBe('3');
	});

	test('arrow keys skip a disabled tab and it is exposed as disabled', () => {
		const tabs = mount(<KeyboardTabs disableSecond />, {attachTo: container});
		expect(tab(tabs, '2').prop('aria-disabled')).toBe('true');
		tab(tabs, '1').simulate('keyDown', {key: 'ArrowRight'});
		expect(tabs.state('tabId')).toBe('3');
	});

	test('keys pressed in a control nested in a tab title are left to that control', () => {
		const tabs = mount(
			<Tabs activeTab='1' onTabClick={onTabClick}>
				<Tab title='tab 1' tabId='1' data-test-id='1'>Tab #1</Tab>
				<Tab title={<span>tab 2 <input className='nested' /></span>} tabId='2' data-test-id='2'>Tab #2</Tab>
			</Tabs>
		);
		const nested = tabs.find('input.nested');
		const enter = {key: 'Enter', preventDefault: jest.fn()};
		const arrow = {key: 'ArrowRight', preventDefault: jest.fn()};
		nested.simulate('keyDown', enter);
		nested.simulate('keyDown', arrow);
		expect(onTabClick).not.toHaveBeenCalled();
		expect(enter.preventDefault).not.toHaveBeenCalled();
		expect(arrow.preventDefault).not.toHaveBeenCalled();
	});

	test('a disabled tab cannot be selected with Enter', () => {
		const tabs = mount(<KeyboardTabs disableSecond />);
		tab(tabs, '2').simulate('keyDown', {key: 'Enter'});
		expect(tabs.state('tabId')).toBe('1');
	});
});
