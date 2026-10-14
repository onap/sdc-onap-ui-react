import React, { Children } from 'react';
import PropTypes from 'prop-types';
import TileInfo from './TileInfo.js';
import TileFooter from './TileFooter.js';
import SVGIcon from './SVGIcon.js';
import { keyboardClick } from '../utils/keyboardClick.js';

const Tile = ({
    headerText,
    headerColor,
    iconName,
    iconColor,
    className,
    onClick,
    children,
    dataTestId,
    ariaLabel
}) => {
    let childrenArr = Children.toArray(children);
    return (
        <div
            className={`sdc-tile ${className || ''}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
            aria-label={onClick ? ariaLabel : undefined}
            onKeyDown={onClick ? keyboardClick(onClick) : undefined}
            data-test-id={dataTestId}>
            <div className={`sdc-tile-header ${headerColor || ''}`}>
                {headerText}
            </div>
            <div className="sdc-tile-content">
                <div className={`sdc-tile-content-icon ${iconColor || ''}`}>
                    {iconName && <SVGIcon name={iconName} />}
                </div>
                {childrenArr.find(
                    e =>
                        (e.type && e.type.displayName === 'TileInfo') ||
                        e.type === TileInfo
                )}
            </div>
            {childrenArr.find(
                e =>
                    e.type.displayName === 'TileFooter' || e.type === TileFooter
            )}
        </div>
    );
};

Tile.propTypes = {
    headerText: PropTypes.string,
    headerColor: PropTypes.string,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    dataTestId: PropTypes.string,
    ariaLabel: PropTypes.string
};

export default Tile;
