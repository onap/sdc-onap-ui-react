import React, { Children } from 'react';
import PropTypes from 'prop-types';
import TileInfo from './TileInfo.js';
import TileFooter from './TileFooter.js';
import SVGIcon from './SVGIcon.js';

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
            data-test-id={dataTestId}>
            <div className={`sdc-tile-header ${headerColor || ''}`}>
                {onClick ? (
                    <button
                        type="button"
                        className="sdc-tile-header-button"
                        aria-label={ariaLabel}
                        onClick={onClick}>
                        {headerText}
                    </button>
                ) : (
                    headerText
                )}
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
    ariaLabel: (props, propName, componentName) => {
        if (props.onClick && !props.headerText && !props[propName]) {
            return new Error(
                `${componentName}: a clickable tile needs headerText or ariaLabel to name its button.`
            );
        }
        if (
            props[propName] !== undefined &&
            typeof props[propName] !== 'string'
        ) {
            return new Error(`${componentName}: ariaLabel must be a string.`);
        }
        return null;
    }
};

export default Tile;
