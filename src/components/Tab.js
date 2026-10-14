import React from 'react';

class Tab extends React.Component {
    render() {
        const {
            activeTab,
            tabId,
            title,
            onClick,
            onKeyDown,
            tabRef,
            id,
            panelId,
            disabled,
            className = ''
        } = this.props;
        const dataTestId = this.props['data-test-id'];
        const selected = activeTab === tabId;
        return (
            <li
                className={`sdc-tab ${
                    selected ? 'sdc-tab-active' : ''
                } ${className}`}
                role="presentation"
                data-test-id={dataTestId}>
                <button
                    type="button"
                    className="sdc-tab__button"
                    role="tab"
                    ref={tabRef}
                    id={id}
                    aria-selected={selected ? 'true' : 'false'}
                    aria-controls={panelId}
                    tabIndex={selected ? 0 : -1}
                    disabled={disabled}
                    onClick={onClick}
                    onKeyDown={onKeyDown}>
                    {title}
                </button>
            </li>
        );
    }
}

export default Tab;
