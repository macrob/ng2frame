module.exports = function(cnf) {
return {
	dist: {
			options: {
					patterns: [{
							json: cnf.variables
					}]
			},
			files: [{
					expand: true,
					flatten: true,
					src: [cnf.build + '/app/config/index.js'],
					dest: cnf.build + '/app/config/'
			}]
	}
}
}
