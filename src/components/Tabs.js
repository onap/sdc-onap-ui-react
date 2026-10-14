import React from 'react';
import TabPane from './TabPane.js';

let nextId = 0;

class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.idPrefix = 'sdc-tabs-' + nextId++;
        this.tabElements = [];
    }

    tabDomId(index) {
        return `${this.idPrefix}-tab-${index}`;
    }

    onTabKeyDown(event, index) {
        if (
            event.target !== event.currentTarget ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
        ) {
            return;
        }
        const { children = [], onTabClick } = this.props;
        let target = -1;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            target = this.nextEnabled(children, index, 1);
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            target = this.nextEnabled(children, index, -1);
        } else if (event.key === 'Home') {
            target = this.nextEnabled(children, -1, 1);
        } else if (event.key === 'End') {
            target = this.nextEnabled(children, children.length, -1);
        }
        if (target < 0) {
            return;
        }
        event.preventDefault();
        onTabClick(children[target].props.tabId);
        const el = this.tabElements[target];
        if (el) {
            el.focus();
        }
    }

    nextEnabled(children, from, step) {
        const n = children.length;
        for (let i = 1; i <= n; i++) {
            const candidate = (((from + step * i) % n) + n) % n;
            if (!children[candidate].props.disabled) {
                return candidate;
            }
        }
        return -1;
    }

    render() {
        const {
            type,
            children = [],
            activeTab,
            onTabClick,
            className
        } = this.props;
        const activeIndex = children.findIndex(
            child => child.props.tabId === activeTab
        );
        const panelId = `${this.idPrefix}-panel`;
        return (
            <div
                className={
                    type === 'header'
                        ? `sdc-tabs sdc-tabs-header ${className || ''}`
                        : `sdc-tabs sdc-tabs-menu ${className || ''}`
                }>
                <ul className="sdc-tabs-list" role="tablist">
                    {children.map((child, index) =>
                        React.cloneElement(child, {
                            key: child.props.tabId,
                            onClick: () => onTabClick(child.props.tabId),
                            onKeyDown: event => this.onTabKeyDown(event, index),
                            tabRef: el => {
                                this.tabElements[index] = el;
                            },
                            id: this.tabDomId(index),
                            // Only the active tab's panel is rendered, so the others would
                            // reference an id that does not exist.
                            panelId:
                                index === activeIndex ? panelId : undefined,
                            activeTab
                        })
                    )}
                </ul>
                <TabPane
                    id={panelId}
                    labelledBy={
                        activeIndex >= 0
                            ? this.tabDomId(activeIndex)
                            : undefined
                    }>
                    {children.map(child => {
                        if (child.props.tabId === activeTab) {
                            return child.props.children;
                        }
                    })}
                </TabPane>
            </div>
        );
    }
}

export default Tabs;
