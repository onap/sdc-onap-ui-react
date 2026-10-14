import React from 'react';
import PropTypes from 'prop-types';

import Portal from './Portal.js';
import Body from './ModalBody.js';
import Header from './ModalHeader.js';
import Footer from './ModalFooter.js';
import Title from './ModalTitle.js';

export const modalSize = {
    medium: 'md',
    large: 'l',
    extraLarge: 'xl',
    small: 'sm',
    extraSmall: 'xsm'
};

let nextId = 0;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.titleId = 'sdc-modal-title-' + nextId++;
        this.setDialogRef = this.setDialogRef.bind(this);
        this.onDocumentKeyDown = event => {
            if (
                (event.key === 'Escape' || event.keyCode === 27) &&
                this.props.show &&
                this.props.onClose
            ) {
                this.props.onClose();
            }
        };
    }

    // Portal renders its subtree after this component's lifecycle methods have run, so the
    // dialog only exists in the DOM once this ref fires.
    setDialogRef(el) {
        this.dialogRef = el;
        // A child that focused itself while mounting (autoFocus) keeps focus.
        if (el && !el.contains(document.activeElement)) {
            el.focus();
        }
    }

    getChildContext() {
        return { sdcModalTitleId: this.titleId };
    }

    componentWillMount() {
        if (this.props.show) {
            this.returnFocusTo = document.activeElement;
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onDocumentKeyDown);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show && !this.props.show) {
            this.returnFocusTo = document.activeElement;
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.show && prevProps.show) {
            this.restoreFocus();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onDocumentKeyDown);
        if (this.props.show) {
            this.restoreFocus();
        }
    }

    restoreFocus() {
        const target = this.returnFocusTo;
        this.returnFocusTo = null;
        if (target && target.focus && document.body.contains(target)) {
            target.focus();
        }
    }

    render() {
        const { size, type, children, show } = this.props;
        return (
            <Portal>
                <div
                    ref={el => {
                        this.modalRef = el;
                    }}>
                    {show && <div className="modal-background" />}
                    {show && (
                        <div className={`sdc-modal ${modalSize[size]}`}>
                            <div
                                ref={this.setDialogRef}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={this.titleId}
                                tabIndex={-1}
                                className={`sdc-modal__wrapper sdc-modal-type-${type}`}>
                                {children}
                            </div>
                        </div>
                    )}
                </div>
            </Portal>
        );
    }
}

Modal.childContextTypes = {
    sdcModalTitleId: PropTypes.string
};

Modal.defaultProps = {
    show: false,
    size: 'medium',
    type: 'info'
};

Modal.propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    onClose: PropTypes.func
};

Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Title = Title;
export default Modal;
