import React from 'react';
import Examples from './utils/Examples.js';
import Notification from '../src/components/Notification.js';
import HTMLNotificationInfo from '../node_modules/onap-ui-common/lib/html/components/notification/notification-info.html';
import HTMLNotificationSuccess from '../node_modules/onap-ui-common/lib/html/components/notification/notification-success.html';
import HTMLNotificationWarning from '../node_modules/onap-ui-common/lib/html/components/notification/notification-warning.html';
import HTMLNotificationError from '../node_modules/onap-ui-common/lib/html/components/notification/notification-error.html';

let examples = {
	Success: {
		jsx: <Notification title='Title' message='message' type='success' />,
		html: HTMLNotificationSuccess
	},
	Warning: {
		jsx: <Notification title='Title' message='message' type='warning' />,
		html: HTMLNotificationWarning
	},
	Info: {
		jsx: <Notification title='Title' message='message' type='info' />,
		html: HTMLNotificationInfo
	},
	Error: {
		jsx: <Notification title='Title' message='message' type='error' />,
		html: HTMLNotificationError
	}

};

const Notifications = () => <Examples examples={examples} />;

export default Notifications;
