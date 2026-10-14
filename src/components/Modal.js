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

// Mounted inside the Portal and only while the modal is shown, so it opens the dialog
// once the element is in the document: Portal re-renders its subtree only after Modal's
// own componentDidUpdate. Not rendering it while hidden matters because onap-ui-common's
// .sdc-modal display rule overrides the browser's display:none for a closed dialog.
class NativeDialog extends React.Component {
    constructor(props) {
        super(props);
        this.setRef = el => {
            this.el = el;
        };
        // Visibility belongs to the parent's show prop, so Escape only asks it to close.
        this.onCancel = event => {
            event.preventDefault();
            if (this.props.onClose) {
                this.props.onClose();
            }
        };
        // A browser may close the dialog on Escape despite preventDefault() (no user
        // activation since the last one); it has to stay open while it is rendered.
        this.onNativeClose = () => {
            if (!this.tornDown && document.body.contains(this.el)) {
                this.open();
            }
        };
    }

    componentDidMount() {
        this.el.addEventListener('cancel', this.onCancel);
        this.el.addEventListener('close', this.onNativeClose);
        this.open();
        this.syncLabel();
    }

    componentDidUpdate() {
        this.syncLabel();
    }

    componentWillUnmount() {
        this.teardown();
    }

    open() {
        if (this.props.modal) {
            this.el.showModal();
        } else {
            this.el.show();
        }
    }

    // Also called by Modal on unmount: Portal removes its node without unmounting this
    // subtree, and only close() returns focus to the opener.
    teardown() {
        if (this.tornDown) {
            return;
        }
        this.tornDown = true;
        this.el.removeEventListener('cancel', this.onCancel);
        this.el.removeEventListener('close', this.onNativeClose);
        if (this.el.open) {
            this.el.close();
        }
    }

    syncLabel() {
        const { titleId } = this.props;
        if (this.el.querySelector('#' + titleId)) {
            this.el.setAttribute('aria-labelledby', titleId);
        } else {
            this.el.removeAttribute('aria-labelledby');
        }
    }

    render() {
        return (
            <dialog ref={this.setRef} className={this.props.className}>
                {this.props.children}
            </dialog>
        );
    }
}

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.titleId = 'sdc-modal-title-' + nextId++;
        this.setNativeDialog = dialog => {
            this.nativeDialog = dialog;
        };
    }

    getChildContext() {
        return { sdcModalTitleId: this.titleId };
    }

    get dialogRef() {
        return this.nativeDialog ? this.nativeDialog.el : null;
    }

    componentWillUnmount() {
        if (this.nativeDialog) {
            this.nativeDialog.teardown();
        }
    }

    render() {
        const { size, type, children, show, onClose, modal } = this.props;
        return (
            <Portal>
                <div
                    ref={el => {
                        this.modalRef = el;
                    }}>
                    {show && <div className="modal-background" />}
                    {show && (
                        <NativeDialog
                            ref={this.setNativeDialog}
                            modal={modal}
                            onClose={onClose}
                            titleId={this.titleId}
                            className={`sdc-modal ${modalSize[size]}`}>
                            <div
                                className={`sdc-modal__wrapper sdc-modal-type-${type}`}>
                                {children}
                            </div>
                        </NativeDialog>
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
    modal: true,
    size: 'medium',
    type: 'info'
};

Modal.propTypes = {
    show: PropTypes.bool,
    size: PropTypes.string,
    children: PropTypes.node,
    type: PropTypes.string,
    onClose: PropTypes.func,
    modal: PropTypes.bool
};

Modal.Body = Body;
Modal.Header = Header;
Modal.Footer = Footer;
Modal.Title = Title;
export default Modal;
