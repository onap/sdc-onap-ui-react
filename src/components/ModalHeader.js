import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from './SVGIcon.js';
import iconMap from '../utils/iconMap.js';

const iconMaper = {
    error: 'error',
    info: 'errorCircle',
    alert: 'exclamationTriangleLine'
};

const headerTypes = {
    error: 'sdc-error__header',
    info: 'sdc-info__header',
    alert: 'sdc-alert__header',
    custom: 'sdc-custom__header'
};

const CloseIcon = iconMap.close;

const Header = ({ children, onClose, type, closeAriaLabel }) => (
    <div className={headerTypes[type] + ' sdc-modal__header'}>
        {type !== 'custom' && (
            <SVGIcon
                iconClassName="sdc-modal__icon"
                className="sdc-modal__svg-use"
                name={iconMaper[type]}
            />
        )}
        {children}
        {onClose ? (
            <button
                type="button"
                className="svg-icon-wrapper sdc-modal__close-button-svg sdc-modal__close-button bottom"
                aria-label={closeAriaLabel}
                onClick={onClose}>
                <CloseIcon className="svg-icon __close" aria-hidden="true" />
            </button>
        ) : (
            <SVGIcon
                iconClassName="sdc-modal__close-button-svg"
                className="sdc-modal__close-button"
                name="close"
            />
        )}
    </div>
);

Header.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    closeAriaLabel: PropTypes.string
};

Header.defaultProps = {
    type: 'info',
    closeAriaLabel: 'Close'
};

export default Header;
