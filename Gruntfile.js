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
                    '<%= dir.release %>/bower_components/*/LICENSE*',
                    '<%= dir.release %>/bower_components/*/History.md',
                    '<%= dir.release %>/bower_components/*/guides',
                    '<%= dir.release %>/bower_components/*/Makefile',
                    '<%= dir.release %>/bower_components/*/COPYING',
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
                src: ['<%= dir.release %>/components/*.html', '<%= dir.release %>/js/*.js']
            }
        },
        // compress JS files
        uglify: {
            default: {
                expand: true,
                cwd: '<%= dir.release %>/js/',
                src: ["*.js"],
                dest: '<%= dir.release %>/js/'
            },
        },
        // compress HTML files
        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeCDATASectionsFromCDATA: true,
                    collapseWhitespace: false,
                    removeRedundantAttributes: true,
                    removeOptionalTags: false,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= dir.release %>/',
                        src: ['step.*.html'],
                        dest: '<%= dir.release %>/'
                    },
                ]
            }
        },
        // compress CSS file
        cssmin: {
            maincss: {
                expand: true,
                cwd: '<%= dir.release %>/css/',
                src: ['*.css'],
                dest: '<%= dir.release %>/css/'
            },
            componentscss: {
                expand: true,
                cwd: '<%= dir.release %>/components/',
                src: ['*.css'],
                dest: '<%= dir.release %>/components/'
            }
        },
        // vulcanize
        vulcanize: {
            default: {
                options: {
                    strip: true,
                    csp: false,
                    inline: false,
                    excludes: {
                        imports: [
                            "step.*.html",
                            "js/main.js"
                        ]
                    }
                },
                files: {
                    //'<%= dir.release %>/bower_components/paper-material/paper-material.html': '<%= dir.release %>/bower_components/paper-material/paper-material.html',
                    //'<%= dir.release %>/bower_components/iron-icons/iron-icons.html': '<%= dir.release %>/bower_components/iron-icons/iron-icons.html',
                    //'<%= dir.release %>/bower_components/iron-selector/iron-selector.html': '<%= dir.release %>/bower_components/iron-selector/iron-selector.html',
                    //'<%= dir.release %>/bower_components/neon-animation/neon-animated-pages.html': '<%= dir.release %>/bower_components/neon-animation/neon-animated-pages.html',
                    //'<%= dir.release %>/bower_components/neon-animation/neon-animatable.html': '<%= dir.release %>/bower_components/neon-animation/neon-animatable.html',
                    //'<%= dir.release %>/bower_components/neon-animation/neon-animations.html': '<%= dir.release %>/bower_components/neon-animation/neon-animations.html',
                    //'<%= dir.release %>/bower_components/paper-dialog/paper-dialog.html': '<%= dir.release %>/bower_components/paper-dialog/paper-dialog.html',
                    //'<%= dir.release %>/bower_components/paper-styles/paper-styles.html': '<%= dir.release %>/bower_components/paper-styles/paper-styles.html',
                    //'<%= dir.release %>/bower_components/paper-button/paper-button.html': '<%= dir.release %>/bower_components/paper-button/paper-button.html',
                    //'<%= dir.release %>/bower_components/paper-icon-button/paper-icon-button.html': '<%= dir.release %>/bower_components/paper-icon-button/paper-icon-button.html',
                    //'<%= dir.release %>/bower_components/paper-menu/paper-menu.html': '<%= dir.release %>/bower_components/paper-menu/paper-menu.html',
                    //'<%= dir.release %>/bower_components/paper-header-panel/paper-header-panel.html': '<%= dir.release %>/bower_components/paper-header-panel/paper-header-panel.html',
                    //'<%= dir.release %>/bower_components/paper-drawer-panel/paper-drawer-panel.html': '<%= dir.release %>/bower_components/paper-drawer-panel/paper-drawer-panel.html',
                    //'<%= dir.release %>/bower_components/paper-item/paper-item.html': '<%= dir.release %>/bower_components/paper-item/paper-item.html',
                    //'<%= dir.release %>/bower_components/paper-ripple/paper-ripple.html': '<%= dir.release %>/bower_components/paper-ripple/paper-ripple.html',
                    //'<%= dir.release %>/bower_components/paper-progress/paper-progress.html': '<%= dir.release %>/bower_components/paper-progress/paper-progress.html',
                    '<%= dir.release %>/components/polymer-cookie.html': '<%= dir.release %>/components/polymer-cookie.html',
                    '<%= dir.release %>/components/codelab-pack.html': '<%= dir.release %>/components/codelab-pack.html',
                    '<%= dir.release %>/components/codelab-article.html': '<%= dir.release %>/components/codelab-article.html',
                    //
                    //'<%= dir.release %>/components/import.html': '<%= dir.release %>/components/import.html',
                    //'<%= dir.release %>/components/import_papers.html': '<%= dir.release %>/components/import_papers.html',
                    //'<%= dir.release %>/components/import_papers.html': '<%= dir.release %>/components/import_papers00.html',
                    //'<%= dir.release %>/components/import_codelabs.html': '<%= dir.release %>/components/import_codelabs.html',
                    //'<%= dir.release %>/components/import_papers01.html': '<%= dir.release %>/components/import_papers01.html',
                    //'<%= dir.release %>/index.html': '<%= dir.release %>/index.html',
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
        'uglify:default',
        'cssmin:maincss',
        'cssmin:componentscss',
        'htmlmin:all',
        'vulcanize:default',
        'clean:deleteReadmeEtcFile',
    ]);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};