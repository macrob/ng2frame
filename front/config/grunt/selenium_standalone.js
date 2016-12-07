module.exports = function(cnf) {

return	{
		options: {
			stopOnExit: true
		},
		your_target: {
			seleniumVersion: '2.53.0',
			seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
			drivers: {
				chrome: {
					version: '2.21',
					arch: process.arch,
					baseURL: 'http://chromedriver.storage.googleapis.com'
				},
				ie: {
					version: '2.53.0',
					arch: 'ia32',
					baseURL: 'http://selenium-release.storage.googleapis.com'
				}
			}
		}
	};
};
