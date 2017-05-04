module.exports = function(grunt) {

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['src/**/*.js'],
                    dest: 'build',
                }]
            }
        },
        watch: {
            
                files: ['src/**/*.js'],
                tasks: ['babel'],
                options: {
                spawn: false,
                },
            
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-watch');
}