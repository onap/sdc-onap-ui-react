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
                onClick={disabled ? undefined : onClick}
                onKeyDown={onKeyDown}
                ref={tabRef}
                id={id}
                data-test-id={dataTestId}
                role="tab"
                aria-selected={selected ? 'true' : 'false'}
                aria-controls={panelId}
                aria-disabled={disabled ? 'true' : undefined}
                tabIndex={selected ? 0 : -1}
                disabled={disabled}>
                {title}
            </li>
        );
    }
}

export default Tab;
