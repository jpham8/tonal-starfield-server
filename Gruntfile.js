module.exports = function(grunt){
	grunt.initConfig({
		express: {
			options: {
				port: 80
			},
			dev: {
				options: {
					script: 'main.js'
				}
			}
		},
		jshint: {
			options: {
				force: true,
				jshintrc: true,
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'**/*.js'
			]
		},
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true,
				interval: 1500
			},
			express: {
				files: ['main.js', 'public/**', 'routes/**'],
				tasks: ['jshint', 'express:dev'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('serve', ['jshint', 'express:dev', 'watch']);
	grunt.registerTask('test', ['jshint']);
};
