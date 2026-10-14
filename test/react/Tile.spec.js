import React from 'react';
import Tile from '../../src/components/Tile.js';
import TileInfo from '../../src/components/TileInfo.js';
import TileInfoLine from '../../src/components/TileInfoLine.js';
import TileFooter from '../../src/components/TileFooter.js';
import TileFooterCell from '../../src/components/TileFooterCell.js';

import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

describe('Tile', () => {
	test('Empty tile', () => {
		const tile = renderer.create(<Tile />).toJSON();
		expect(tile).toMatchSnapshot();
	});

	test('Tile with props', () => {
		const tile = renderer.create(<Tile headerText='header' headerColor='blue' iconName='vlm' iconColor='blue' />).toJSON();
		expect(tile).toMatchSnapshot();
	});

	test('Tile with content info', () => {
		const tile = renderer.create(<Tile><TileInfo align='center'><TileInfoLine type='title'>Info</TileInfoLine></TileInfo></Tile>).toJSON();
		expect(tile).toMatchSnapshot();
	});

	test('Tile with footer', () => {
		const tile = renderer.create(<Tile><TileFooter align='center'><TileFooterCell>Footer</TileFooterCell></TileFooter></Tile>).toJSON();
		expect(tile).toMatchSnapshot();
	});
});

describe('Tile - clickable', () => {
	test('a clickable tile exposes its header as a native button and the card has no role', () => {
		const onClick = jest.fn();
		const tile = mount(<Tile headerText='header' onClick={onClick} />);
		const card = tile.find('.sdc-tile');
		expect(card.type()).toBe('div');
		expect(card.prop('role')).toBeUndefined();
		expect(card.prop('tabIndex')).toBeUndefined();
		const button = tile.find('.sdc-tile-header button.sdc-tile-header-button');
		expect(button.prop('type')).toBe('button');
		expect(button.text()).toBe('header');
		button.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('a clickable tile without headerText is named by ariaLabel', () => {
		const onClick = jest.fn();
		const tile = mount(<Tile onClick={onClick} ariaLabel='Vendor Acme' />);
		const button = tile.find('button.sdc-tile-header-button');
		expect(button.prop('aria-label')).toBe('Vendor Acme');
		button.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	test('a clickable tile without headerText or ariaLabel is reported', () => {
		const error = jest.spyOn(console, 'error').mockImplementation(() => {});
		mount(<Tile onClick={() => {}} />);
		expect(error.mock.calls.some(args => /needs headerText or ariaLabel/.test(args[0]))).toBe(true);
		error.mockRestore();
	});

	test('a tile without onClick has no button', () => {
		const tile = mount(<Tile headerText='header' />);
		expect(tile.find('button').length).toBe(0);
		expect(tile.find('.sdc-tile-header').text()).toBe('header');
	});
});
