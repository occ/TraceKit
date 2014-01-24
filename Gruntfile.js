/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        clean: {
            dist: ['dist']
        },
        closureCompiler: {
            options: {
                compilerFile: './closure/compiler.jar',
                checkModified: true,
                compilerOpts: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    warning_level: 'verbose',
                    jscomp_off: ['checkTypes', 'fileoverviewTags'],
                    summary_detail_level: 3
                },
                execOpts: {
                    maxBuffer: 200 * 1024
                }

            },
            compile: {
                src: './tracekit.js',
                dest: './dist/tracekit.noplugins.min.js'
            },
            compileWithPlugins: {
                src: ['./tracekit.js', './plugins/*.js'],
                dest: './dist/tracekit.min.js'
            }
        },
        jshint: {
            options: {
                // Uncommented are default grunt options
                bitwise: true, //Added from site
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true, //Added from site
                nonew: true, //Added
                quotmark: 'single', //Added
                /* regexp: true, */
                undef: true,
                unused: true, //Added from site
                /* strict: true, //Added from site */
                sub: true,
                boss: true, //dont' allow assignments to be evaluated as truthy/falsey */
                eqnull: true, //Allow == null
                browser: true,
                /* indent: 4, //Added from site */
                devel: true, //Added
                white: false,
                onecase: true,
                trailing: true,
                maxparams: 6,
                maxdepth: 9,
                maxerr: 20
            },
            globals: {
                ActiveXObject: false
            },
            lint: {
                src: ['Gruntfile.js', 'tracekit.js', './plugins/*.js']
            }
        },
        connect: {
          test: {
            options: {
              port: 9001,
              open: 'http://localhost:9001/tests/testBuild.html',
              keepalive: true
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-closure-tools');

    grunt.registerTask('default', ['clean', 'jshint:lint', 'closureCompiler']);
    grunt.registerTask('travis', ['clean', 'jshint:lint', 'closureCompiler']);

    // Launch the recursion test
    grunt.registerTask('test', ['default', 'connect:test']);
};
