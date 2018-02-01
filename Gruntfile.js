module.exports = function(grunt) {

	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({

		sass: {
			dist: {
				options: {
					style: 'nested'
				},
				files: {
					'styles/style.css': 'styles/style.scss'
				}
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'src/outline-shader.js',
					'src/model-scene.js',
					'src/scenes/gas-mask.js',
					'src/scenes/horse.js',
					'src/scenes/skull.js',
					'src/scenes/max.js',
					'src/scenes/rhino.js',
					'src/scenes/elephant.js',
					'src/scenes/giraffe.js',
					'src/scenes/gator.js',
					'src/scenes/scorpion.js',
					'src/scenes/bird.js',
					'src/scenes/wavid.js',
					'src/main.js'
				],
				dest: 'build/app.js',
			},
		},

		uglify: {
			options: {
				compress: {
					drop_console: false
				}
			},
			my_target: {
				files: {
					'build/app.min.js': ['build/app.js']
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			sass: {
				files: ['styles/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['src/*.js','src/**/*.js'],
				tasks: ['concat','uglify']
			}
		},

		connect: {
			server: {
				options: {
					base: '.',
					port: 8008
				}
			}
		},

		open: {
			server: {
				path: 'http://localhost:<%= connect.server.options.port %>'
			}
		}

	});

	grunt.registerTask('build', ['sass', 'concat', 'uglify']);

	grunt.registerTask('default', ['build', 'connect:server', 'open:server', 'watch']);

};