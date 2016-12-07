var config = require('config');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').execSync;


var cnf = {};
cnf.root = path.resolve(__dirname, '..', '..');
cnf.build = path.resolve(cnf.root, 'dist', 'gbuild') + '/';
cnf.app = path.resolve(cnf.build, 'app') + '/';
cnf.systemjsPath = path.resolve(cnf.app, 'systemjs.configs.js');



var cntModules = format(getModules(cnf));
// console.log(replace(cnf.systemjsPath, cntModules));

fs.writeFileSync(cnf.systemjsPath, replace(cnf.systemjsPath, cntModules));



function getModules({ app, build, root}) {

	var result = [];
	var rs = exec('find ' + app + ' -iname \'index.js\'', {
		encoding: 'utf-8'
	});

	rs = rs.split("\n");

	rs.forEach( (item) => {
		item = path.resolve(item);

		var dirname = path.dirname(item);
		var barrel = dirname.replace(build, '');

		if (item === root || barrel === 'app') {
			return true;
		}

		result.push(barrel);
	});

	return result;
}

function format(barrels) {
	var result = '';

	barrels.forEach( (item) => {
		result += "'" + item+ "': {main: 'index.js', defaultExtension: 'js'},\n";
	});

	return result;
}

function replace(file, content, keyword = 'var barrels = {};') {
	var cnf = fs.readFileSync(file, {
		encoding: 'utf-8'
	});

	content = "var barrels = {\n" + content + "\n};";

	return cnf.replace(keyword, content);
}
