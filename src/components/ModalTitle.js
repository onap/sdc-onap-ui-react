import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children, className }, context) => (
    <div className={`title ${className}`} id={context.sdcModalTitleId}>
        {children}
    </div>
);

Title.contextTypes = {
    sdcModalTitleId: PropTypes.string
};

Title.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

Title.defaultProps = {
    className: ''
};

export default Title;
