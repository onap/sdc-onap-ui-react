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

describe('Tile - keyboard', () => {
	test('a clickable tile is a button that Enter and Space activate', () => {
		const onClick = jest.fn();
		const tile = mount(<Tile headerText='header' onClick={onClick} />).find('.sdc-tile');
		expect(tile.prop('role')).toBe('button');
		expect(tile.prop('tabIndex')).toBe(0);
		tile.simulate('keyDown', { key: 'Enter' });
		tile.simulate('keyDown', { key: ' ' });
		expect(onClick).toHaveBeenCalledTimes(2);
	});

	test('a tile without onClick is not a button', () => {
		const tile = mount(<Tile headerText='header' />).find('.sdc-tile');
		expect(tile.prop('role')).toBeUndefined();
		expect(tile.prop('tabIndex')).toBeUndefined();
	});
});
