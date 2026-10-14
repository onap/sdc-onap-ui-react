import React from 'react';
import PropTypes from 'prop-types';

import iconMap from '../utils/iconMap.js';
import { keyboardClick } from '../utils/keyboardClick.js';

const SVGIcon = ({
    name,
    onClick,
    label,
    className,
    iconClassName,
    labelClassName,
    labelPosition,
    color,
    disabled,
    ariaLabel,
    ...other
}) => {
    let colorClass = color !== '' ? '__' + color : '';
    let classes = `svg-icon-wrapper ${iconClassName} ${className} ${colorClass} ${
        onClick ? 'clickable' : ''
    } ${labelPosition}`;
    let camelCasedName = name.replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
    });
    let IconComponent = iconMap[camelCasedName];
    if (!IconComponent) {
        console.error('Icon by the name ' + camelCasedName + ' is missing.');
    }

    const handleClick = onClick && !disabled ? onClick : undefined;
    let a11y = { 'aria-hidden': label ? undefined : 'true' };
    if (onClick) {
        a11y = {
            role: 'button',
            tabIndex: disabled ? -1 : 0,
            'aria-disabled': disabled ? 'true' : undefined,
            'aria-label': ariaLabel,
            onKeyDown: handleClick ? keyboardClick(handleClick) : undefined
        };
    }

    return (
        <div
            {...a11y}
            {...other}
            onClick={handleClick}
            className={classes}
            disabled={disabled}>
            {IconComponent && (
                <IconComponent
                    className={`svg-icon __${name}`}
                    aria-hidden="true"
                />
            )}
            {!IconComponent && (
                <span className="svg-icon-missing">Missing Icon</span>
            )}
            {label && (
                <span className={`svg-icon-label ${labelClassName}`}>
                    {label}
                </span>
            )}
        </div>
    );
};

SVGIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelPosition: PropTypes.string,
    className: PropTypes.string,
    iconClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    ariaLabel: PropTypes.string
};

SVGIcon.defaultProps = {
    name: '',
    label: '',
    className: '',
    iconClassName: '',
    labelClassName: '',
    labelPosition: 'bottom',
    color: ''
};

export default SVGIcon;
