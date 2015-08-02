'use strict';
var path = require('path');

module.exports = function(grunt) {
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        pkg: pkg,
        dir: {
            src: 'src',
            release: 'release'
        },
        // delete unnecessary files
        clean: {
            // delete inside of release directory
            deleteReleaseFolder00: {
                src: [
                    '<%= dir.release %>/',
                    '<%= dir.src %>*/.DS_Store',
                    '<%= dir.src %>*/Thumbs.db'
                ],
            },
            deleteReadmeEtcFile: {
                src: [
                    '<%= dir.release %>/bower_components/NodeBind/',
                    '<%= dir.release %>/bower_components/TemplateBinding/',
                    '<%= dir.release %>/bower_components/*/README.md',
                    '<%= dir.release %>/bower_components/*/package.json',
                    '<%= dir.release %>/bower_components/*/gruntfile.js',
                    '<%= dir.release %>/bower_components/*/*bower.json',
                    '<%= dir.release %>/bower_components/*/test',
                    '<%= dir.release %>/bower_components/*/AUTHORS',
                    '<%= dir.release %>/bower_components/*/codereview.settings',
                    '<%= dir.release %>/bower_components/*/examples',
                    '<%= dir.release %>/bower_components/*/build.log',
                    '<%= dir.release %>/bower_components/*/demo.html',
                    '<%= dir.release %>/bower_components/*/demo',
                    '<%= dir.release %>/bower_components/*/index.html',
                ]
            }
        },
        // copy files
        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= dir.src %>/",
                        src: ["bower_components/**", "components/**", "images/**", "download/**", "css/**", "js/**", "**html", "**js", "**json"],
                        dest: "<%= dir.release %>/"
                    }
                ]
            }
        },
        // remove-logging
        removelogging: {
            release: {
                src: ['<%= dir.release %>/components/*.html']
            }
        },
        // vulcanize
        vulcanize: {
            default: {
                options: {
                    strip: true,
                    csp: false,
                    inline: true,
                    excludes: {
                        imports: [
                            "step.*.html",
                            "main.js"
                        ]
                    }
                },
                files: {
                    '<%= dir.release %>/index.html': '<%= dir.release %>/index.html'
                }
            }
        }
    });
    
    // autoload packages which are listed in pakage.json
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // Grunt command for creating deliver release
    grunt.registerTask('release',[
        'clean:deleteReleaseFolder00',
        'copy:release',
        'removelogging:release',
        'clean:deleteReadmeEtcFile',
    ]);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};