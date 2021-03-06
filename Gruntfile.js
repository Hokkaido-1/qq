module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        transport: {
            options: {
                alias: '<%= pkg.spm.alias %>'
            },
            component: {
                options: {
                    idleading: 'src/component/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/component/',
                    src: '**/*.js',
                    dest: '_build/component/'
                }]
            },
            js: {
                options: {
                    idleading: 'src/js/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: '**/*.js',
                    dest: '_build/js/'
                }]
            },
            tpl: {
                options: {
                    idleading: 'src/tpl/'
                },
                files: [{
                    expand: true,
                    cwd: 'src/tpl/',
                    src: '**/*.tpl',
                    dest: '_build/tpl/'
                }]
            }
        },
        concat: {
            component: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/component/',
                    src: ['**/*.js'],
                    dest: 'sea-modules/src/component/',
                    ext: '.js'
                }]
            },
            js: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/js/',
                    src: ['**/*.js'],
                    dest: 'sea-modules/src/js/',
                    ext: '.js'
                }]
            },
            tpl: {
                options: {
                    include: 'relative'
                },
                files: [{
                    expand: true,
                    cwd: '_build/tpl/',
                    src: ['**/*.tpl.js'],
                    dest: 'sea-modules/src/tpl/'
                }]
            }
        },
        uglify: {
            main: {
                expand: true,
                cwd: 'sea-modules/src',
                src: ['**/*.js', '!**/*-debug.js'],
                dest: 'sea-modules/src'
            }
        },
        cssmin: {
            main: {
                files: {
                    'sea-modules/src/css/app/app.css': [
                        'src/css/reset.css',
                        'src/css/module/*.css'
                    ]
                }
            }
        },
        imagemin: {
            dynamic: { // Another target
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'src/images/', // Src matches are relative to this path
                    src: ['**/*.{jpg,png,gif}'], // Actual patterns to match
                    dest: 'sea-modules/src/images/', // Destination path prefix
                    filter: "isFile"
                }]
            }
        },
        clean: {
            "beforeBuild": ['sea-modules/src'], //构建之前先删除旧版文件
            "build": ['_build'], //transport临时目录
            "noDebugJS": ['sea-modules/src/**/*-debug.js','sea-modules/src/**/*-debug.tpl.js'] //删除debug文件
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['clean:build', 'clean:noDebugJS']);
    grunt.registerTask('build-img', ['imagemin']);
    grunt.registerTask('build-css', ['cssmin']);
    grunt.registerTask('build', ['clean:beforeBuild', 'transport', 'concat', 'uglify', 'cssmin', 'imagemin','clean:build','clean:noDebugJS']);
};
