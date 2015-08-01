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
        'copy:release',
    ]);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};