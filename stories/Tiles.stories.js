import React from 'react';

import Examples from './utils/Examples.js';
import SVGIcon from '../src/components/SVGIcon.js';
import Button from '../src/components/Button.js';

import Tile from '../src/components/Tile.js';
import TileInfo from '../src/components/TileInfo.js';
import TileInfoLine from '../src/components/TileInfoLine.js';
import TileFooter from '../src/components/TileFooter.js';
import TileFooterCell from '../src/components/TileFooterCell.js';

import HTMLTileWithoutFooter from '../node_modules/onap-ui-common/lib/html/components/tile/tile-without-footer.html';
import HTMLVspTile from '../node_modules/onap-ui-common/lib/html/components/tile/vsp-tile.html';
import HTMLVlmTile from '../node_modules/onap-ui-common/lib/html/components/tile/vlm-tile.html';
import HTMLVendorTile from '../node_modules/onap-ui-common/lib/html/components/tile/vendor-tile.html';
import HTMLVfcTile from '../node_modules/onap-ui-common/lib/html/components/tile/vfc-tile.html';
import HTMLWorkflowTile from '../node_modules/onap-ui-common/lib/html/components/tile/workflow-tile.html';

let examples = {
    'Without footer': {
        jsx: (
            <Tile
                headerText="header"
                headerColor="blue"
                iconName="vsp"
                iconColor="blue">
                <TileInfo>
                    <TileInfoLine type="supertitle">Supertitle</TileInfoLine>
                    <TileInfoLine type="title">Title</TileInfoLine>
                </TileInfo>
            </Tile>
        ),
        html: HTMLTileWithoutFooter
    },
    VFC: {
        jsx: (
            <Tile headerText="vfc" headerColor="purple" iconName="network">
                <TileInfo>
                    <TileInfoLine type="title">Title</TileInfoLine>
                    <TileInfoLine type="subtitle">V 1.0</TileInfoLine>
                </TileInfo>
                <TileFooter>
                    <TileFooterCell>Certified</TileFooterCell>
                </TileFooter>
            </Tile>
        ),
        html: HTMLVfcTile
    },
    VSP: {
        jsx: (
            <Tile
                headerText="vsp"
                headerColor="blue"
                iconName="vsp"
                iconColor="blue">
                <TileInfo>
                    <TileInfoLine type="supertitle">VLM</TileInfoLine>
                    <TileInfoLine type="title">VSP name</TileInfoLine>
                </TileInfo>
                <TileFooter>
                    <TileFooterCell>Draft</TileFooterCell>
                </TileFooter>
            </Tile>
        ),
        html: HTMLVspTile
    },
    VLM: {
        jsx: (
            <Tile
                headerText="vlm"
                headerColor="purple"
                iconName="vlm"
                iconColor="purple">
                <TileInfo>
                    <TileInfoLine type="title">VLM name</TileInfoLine>
                </TileInfo>
                <TileFooter>
                    <TileFooterCell>Certified</TileFooterCell>
                    <TileFooterCell>
                        <SVGIcon
                            name="versionControllerPermissions"
                            label="Owner"
                            labelPosition="left"
                        />
                    </TileFooterCell>
                </TileFooter>
            </Tile>
        ),
        html: HTMLVlmTile
    },
    Vendor: {
        jsx: (
            <Tile iconName="vendor" iconColor="dark-gray">
                <TileInfo align="center">
                    <TileInfoLine type="title">Vendor name</TileInfoLine>
                    <TileInfoLine>
                        <Button btnType="primary" onClick={() => {}}>
                            100 VSPs
                        </Button>
                    </TileInfoLine>
                </TileInfo>
                <TileFooter align="center">
                    <TileFooterCell>
                        <Button
                            btnType="link"
                            color="primary"
                            iconName="plusThin"
                            onClick={() => {}}>
                            Create new VSP
                        </Button>
                    </TileFooterCell>
                </TileFooter>
            </Tile>
        ),
        html: HTMLVendorTile
    },
    Workflow: {
        jsx: (
            <Tile
                headerText="WF"
                headerColor="blue"
                iconName="workflow"
                iconColor="blue">
                <TileInfo>
                    <TileInfoLine type="title">Workflow 1</TileInfoLine>
                </TileInfo>
            </Tile>
        ),
        html: HTMLWorkflowTile
    }
};

const Tiles = () => <Examples examples={examples} />;

export default Tiles;
