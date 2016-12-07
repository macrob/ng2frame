module.exports = function(cnf) {

return	{
		out_dir: './selenium',
		multiCapabilities: [{
			browserName: 'phantomjs'
		}, {
			browserName: 'chrome'
		}
	],
		// seleniumArgs: [{command: 'start'}],
		seleniumPort: cnf.seleniumPort,
		// ignore_ssl: false,
		// proxy: false,
		method: 'GET',

		// webdriverVersions: {
		// 		selenium: '2.44.0',
		// 		chromedriver: '2.12',
		// 		iedriver: '2.44.0',
		// 		phantomjsdriver: ''
		// },

}
}
