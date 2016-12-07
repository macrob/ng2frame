
module.exports = function (cnf) {

	let assets = ['**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'];

	cnf.bower = {
		src: 'src/bower/bower_components/',
		dest: cnf.build + 'bower_components/'
	};

	return {
		// template: {flatten: false, cwd: cnf.srcTpl, expand: true, src: ['**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png'], dest: cnf.build },
		template: {flatten: false, cwd: cnf.srcTpl, expand: true, src: assets, dest: cnf.build },
		// app: {flatten: false, cwd: cnf.srcApp, expand: true, src: ['**/*.html', '**/*.js', '**/*.css', '**/*.md', '**/*.xml', '**/*.ico', '**/*.txt', '**/*.png'], dest: cnf.build+'/app/' },
		app: {flatten: false, cwd: cnf.srcApp, expand: true, src: assets, dest: cnf.build+'/app/' },
		karma: {flatten: false, cwd: 'config/karma/', expand: true, src: ['**/*.js', '**/*.txt'], dest: cnf.build + '/karma/' },

		// templateSing: {flatten: false, cwd: cnf.templateSing.assetsSrc, expand: true, src: assets, dest: cnf.templateSing.assetsDest },
		bower: {flatten: false, cwd: cnf.bower.src, expand: true, src: assets, dest: cnf.bower.dest },
	};

};
