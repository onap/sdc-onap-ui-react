import React from 'react';

class TabPane extends React.Component {
    render() {
        const { children, id, labelledBy } = this.props;
        return (
            <div
                className="sdc-tab-content"
                role="tabpanel"
                id={id}
                aria-labelledby={labelledBy}>
                {children}
            </div>
        );
    }
}

export default TabPane;
