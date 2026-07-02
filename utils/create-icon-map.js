const fs = require('fs');
const path = require('path');

const svgFolder = './node_modules/onap-ui-common/lib/icons/';
const loaderSvgFolder = 'onap-ui-common/lib/icons/';
const iconMapFile = './src/utils/iconMap.js';

let dataToWrite = '';
let iconNames = [];

let iconMapDir = path.dirname(iconMapFile);
if (!fs.existsSync(iconMapDir)) {
	fs.mkdirSync(iconMapDir);
};

fs.readdirSync(svgFolder).forEach(file => {
	let fileName = file.split('.');
	if (fileName[0] && fileName[1] === 'svg') {
		dataToWrite += `import ${fileName[0]} from '-!svg-react-loader!${loaderSvgFolder}${file}';\n`;
		iconNames.push(fileName[0]);
	}
});

dataToWrite += '\n' + `export default {\n\t${iconNames.join(',\n\t')}\n};`;

fs.writeFileSync(iconMapFile, dataToWrite);