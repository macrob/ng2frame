// module.exports = function (cnf) {
// 	return {
// 	default_options: {
// 		port: 8000,
// 	    bsFiles: {
// 		    port: 8000,
// 	        src: [
// 		"css/*.css",
// 		"*.html",
// 		"**/*.{html,htm,css,js}"
// 	        ]
// 	    },
// 	    options: {
// 		    port: 8000,
// 	        baseDir: "./dist/gbuild/",
// 	    }
// 	}
// };
// }


module.exports = function(cnf) {
    return {
        server: {
            bsFiles: {
                src: [
                    //'test/fixtures/css/*.css',
                    'dist/**/*'
                ]
            },
            options: {
                watchTask: true,
                injectChanges: true,
                background: true,
                // open: 'local',
                online: false,
                port: cnf.httpPort,
                // tunnel: cnf.httpHost,
                index: 'index.html',
                directory: true,
                // directory: true,
								logFileChanges: false,
                // the host ip address
                // If specified to, for example, '127.0.0.1' the server will
                // only be available on that ip.
                // Specify '0.0.0.0' to be available everywhere
                ui: {
                    port: 3011
                },
                server: {
                    baseDir: ['./'],
                    index: 'index.html',
                    middleware: [
                        function(req, res, next) {
                            // console.log("from middleware 1");
                            next();
                        }
                    ]
                },
            }
        }
    };
}
