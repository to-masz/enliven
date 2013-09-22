module.exports = function(grunt) {
	
	var enlivenLanguageSourceFiles = grunt.file.expand(['src/enliven_language/*.coffee', 'src/enliven_language/*.litcoffee']);
	var enlivenLibrarySourceFiles = grunt.file.expand(['src/enliven_library/**/*.coffee']);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		
		concat: {
			options: {
				separator: ''
			},
			language: {
				options: {
					banner: '/**\n *\n */\n(function(window, undefined){ var module = {}; var require = function(m){ if(module[m] !== void 0) { return module[m]; } };',
					footer: '})(window)',
					process: function(src, filepath) {
						var module = /([^\/]*)\.js*/.exec(filepath);
						return "module['./"+module[1]+"'] = new function(){ var exports = this; " + src + " if(module.exports){ var temp = module.exports; module.exports = void 0; return temp; }};";
					}
				},
				src: [
					'dist/enliven_language/rewriter.js', 
					'dist/enliven_language/helpers.js', 
					'dist/enliven_language/lexer.js', 
					'dist/enliven_language/parser.js', 
					'dist/enliven_language/scope.js',
					'dist/enliven_language/sourcemap.js', 
					'dist/enliven_language/nodes.js', 
					'dist/enliven_language/coffee-script.js', 
					'dist/enliven_language/browser.js', 
				],
				dest: 'build/<%= pkg.name %>.language.js'
			},
			library: {
				src: [
					'lib/gl-matrix/gl-matrix.js', 
					'dist/enliven_library/Enliven.js',
					'dist/enliven_library/Component.js',
					
					'dist/enliven_library/Camera.js',
					'dist/enliven_library/Canvas.js',
					'dist/enliven_library/Framebuffer.js',
					'dist/enliven_library/Input.js',
					'dist/enliven_library/Material.js',
					'dist/enliven_library/Matrix.js',
					'dist/enliven_library/Shader.js',
					'dist/enliven_library/ShaderProgram.js',
					
					'dist/enliven_library/Mesh.js',
					'dist/enliven_library/Geometry.js',
					'dist/enliven_library/Model.js',
					
					'dist/enliven_library/Texture.js',
					'dist/enliven_library/Light.js',
					//'dist/enliven_library/TextureMaterial.js',
					// shaders
					'dist/enliven_library/core.js',
					'dist/enliven_library/picking.js',
					'dist/enliven_library/color.js',
					'dist/enliven_library/texture.shader.js',
					'dist/enliven_library/light.shader.js',
				],
				dest: 'build/<%= pkg.name %>.js'
			}
		},
				
				
				
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false, // if false works much more faster
//				mangle: {
//					except: ['enliven']
//				}
			},
			build: {
				files: {
					'build/<%= pkg.name %>.language.min.js': ['<%= concat.language.dest %>'],
					'build/<%= pkg.name %>.min.js': ['<%= concat.library.dest %>']
				},
			}
		},
				
				
				
		jshint: {
			files: ['gruntfile.js', 'src/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
				
				
				
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
				
				
				
		shell: {
			'build-language': {
				command: 'coffee -c -o dist/enliven_language '+(enlivenLanguageSourceFiles.join(" ")),
				options: {
					stdout: true,
					stderr: true,
//					callback: function(err, stdout, stderr, cb) {
//						console.log(err, stdout, stderr);
//					}
				}
			},
			'build-library': {
				command: 'node bin/enliven.js -c -o dist/enliven_library '+(enlivenLibrarySourceFiles.join(" ")),
				options: {
					stdout: true,
					stderr: true,
//					callback: function(err, stdout, stderr, cb) {
//						console.log(err, stdout, stderr);
//					}
				}
			}
		}

	});
		
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['build-language', 'build-library', 'uglify']);
	
	
	grunt.registerTask('build-parser', 'Builds parser.', function() {
		var parser = require('./src/enliven_language/grammar').parser;
		grunt.file.write('./dist/enliven_language/parser.js', parser.generate());
	});
	grunt.registerTask('build-language', 'Builds language (includes parser building).', ['build-parser','shell:build-language', 'concat:language']);
	grunt.registerTask('build-library', 'Builds library.', ['shell:build-library', 'concat:library']);

};