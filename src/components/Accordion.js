import React from 'react';
import PropTypes from 'prop-types';
import iconMap from '../utils/iconMap.js';

let nextId = 0;

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.defaultExpanded
        };
        this.bodyId = 'sdc-accordion-body-' + nextId++;
        this.toggle = () => this.setState({ open: !this.state.open });
    }
    render() {
        const { children, title, className, dataTestId, disabled } = this.props;
        const Chevron = iconMap.chevronDown;
        const { open } = this.state;
        return (
            <div
                className={['sdc-accordion', className, disabled && 'disabled']
                    .filter(Boolean)
                    .join(' ')}>
                <button
                    type="button"
                    data-test-id={dataTestId}
                    aria-expanded={open ? 'true' : 'false'}
                    aria-controls={this.bodyId}
                    disabled={disabled}
                    onClick={this.toggle}
                    className="sdc-accordion-header">
                    <span
                        className={`svg-icon-wrapper ${
                            open ? 'down' : ''
                        } bottom`}
                        aria-hidden="true">
                        <Chevron
                            className="svg-icon __chevronDown"
                            aria-hidden="true"
                        />
                    </span>
                    <span className="title">{title}</span>
                </button>
                <div
                    id={this.bodyId}
                    className={`sdc-accordion-body ${open ? 'open' : ''}`}>
                    {children}
                </div>
            </div>
        );
    }
}

Accordion.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    defaultExpanded: PropTypes.bool,
    disabled: PropTypes.bool,
    dataTestId: PropTypes.string
};

Accordion.defaultProps = {
    title: '',
    className: '',
    defaultExpanded: false
};

export default Accordion;
