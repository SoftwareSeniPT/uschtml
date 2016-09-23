module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            watch_js: {
                files: ['js/*.js', '!node_modules/**'],
                tasks: ['uglify'],
            },
            watch_css: {
                files: ['**/*.css', '!node_modules/**'],
                tasks: ['cssmin'],
            },
            options: {
                spawn: false
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/app.min.js': [
                        'js/jquery-1.12.4.min.js',
                        'js/jquery.cycle2.min.js',
                        'js/parallax.min.js',
                        'js/fancybox/jquery.fancybox.pack.js',
                        'js/app.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/style.min.css': [
                        'fonts/styles.css',
                        'js/fancybox/jquery.fancybox.css',
                        'css/style.css',
                        'css/mobile.css',
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
};
