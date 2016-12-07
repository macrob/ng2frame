const config = require('config');
const path = require('path');


const ROOT = path.resolve(__dirname, '..', '..');

module.exports = {
	src: function (pth = '') {
		return path.resolve(ROOT, 'src', pth);
	},
	root: function (pth = '') {
		return path.resolve(ROOT, pth);
	},
	build: function (pth = '', build = 'wbuild') {
		// console.log(path.resolve(ROOT, 'dist', 'wbuild', pth));
		return path.resolve(ROOT, 'dist', build, pth);
	}
};
