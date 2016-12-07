module.exports = function (cnf) {
	return {
		build: [cnf.build],
		e2e: [cnf.e2eBuild],
		spec: [cnf.karma.tsDist + '**/*.spec.js', cnf.karma.tsDist + '**/*.spec.js.map'],
		app: [cnf.build + 'app/'],
		tsclog: ['**/*.tmp.txt', '**/._*', '**/.DS_*', '**/.fuse_*']
	};
};
