import React from 'react';
import PropTypes from 'prop-types';
import SVGIcon from './SVGIcon.js';
import { keyboardClick } from '../utils/keyboardClick.js';

let nextId = 0;

class Accordion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.defaultExpanded
        };
        this.bodyId = 'sdc-accordion-body-' + nextId++;
        this.toggle = () => this.setState({ open: !this.state.open });
        this.onHeaderKeyDown = keyboardClick(this.toggle);
    }
    render() {
        const { children, title, className, dataTestId } = this.props;
        const { open } = this.state;
        return (
            <div className={`sdc-accordion ${className}`}>
                <div
                    data-test-id={dataTestId}
                    role="button"
                    tabIndex={0}
                    aria-expanded={open ? 'true' : 'false'}
                    aria-controls={this.bodyId}
                    onClick={this.toggle}
                    onKeyDown={this.onHeaderKeyDown}
                    className="sdc-accordion-header">
                    <SVGIcon
                        name="chevronDown"
                        iconClassName={open ? 'down' : ''}
                    />
                    <div className="title">{title}</div>
                </div>
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
    dataTestId: PropTypes.string
};

Accordion.defaultProps = {
    title: '',
    className: '',
    defaultExpanded: false
};

export default Accordion;
