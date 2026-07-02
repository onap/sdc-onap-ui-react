# ONAP-UI React Components

This project aims to create a unified UI of styled components for multiple development teams who work on the same web-based applications. 
This repository contains the definitions of all the basic components implemented in React.

In order to use the accompanying styles, you must install onap-ui-common!

### Usage

#### React Code examples
###### Importing a component
```js
import { Button } from 'onap-ui-react';

// inside component rendering...
render() {
	return (
		<Button>I am a Button</Button>
	);
}
```
###### Importing the entire library
```js
import OnapUI from 'onap-ui-react';

// inside component rendering...
render(){
	return (
		<OnapUI.Button>I am still a Button</OnapUI.Button>
	);
}
```
### Running storybook
The components in this library are displayed via [storybook](https://github.com/storybooks/storybook). Head to [http://onap-sdc.github.io/onap-ui-react](http://onap-sdc.github.io/onap-ui-react) to see the components that are in `master`.

While developing, just run `npm run storybook` in your terminal to launch a local storybook server where you can see your changes. For deploying storybook to your own fork repository, refer to the guides section below.

### Useful guides
[Adding a new component](https://github.com/onap-sdc/sdc-ui/wiki/Adding-a-new-component)

[Deploying storybook to a fork's github pages](https://github.com/onap-sdc/sdc-ui/wiki/Deploying-storybook-to-a-fork's-github-pages)
 
### Having some trouble? Have an issue?
For bugs and issues, please use the [issues](https://github.com/onap-sdc/sdc-ui/issues) page

### How to Contribute
**Contribution can be made only by following these guide lines**
* This project combines both `React` & `Angular` framework libraries. Hence, every change in the basic HTML files structure, must be followed by changes on the frameworks files accordingly (under `src/react` and `src/angular`).
* There will be no any 3rd party UI framework imported (i.e. `Bootstrap`, `Material`, `Foundation`... etc.).
* Contribution are done only by the [contribution guide](https://github.com/onap-sdc/sdc-ui/wiki/Contribution-guide). Contributions submitted not in this format and guidelines will not be considered.


