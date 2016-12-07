// module.exports = function(cnf) {
// 	var files = [];
//
// 	files[cnf.build+'css/application.css'] = 'src/scss/application.scss';
//
// 	return {
// 		dist: {
// 		      files: [{
// 		        expand: true,
// 		        cwd: 'src/scss',
// 		        src: ['*.scss'],
// 		        dest: cnf.build+'/css/',
// 		        ext: '.css'
// 		      }]
// 		    }
// 	};
//
// }


module.exports = function(cnf) {
    // var files = [];

    // files[cnf.build + 'css/application.css'] = 'src/scss/application.scss';
		// files[cnf.dest] = cnf.src;

    return {
        options: {
            style: 'compact',
        },
        files: [{
            expand: true,
            cwd: cnf.src,
            src: ['*.scss'],
            // dest: cnf.build + '/css/',
            dest: cnf.dest,
            ext: '.css'
        }]

    };

}
