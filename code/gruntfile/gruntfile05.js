
// Grunt 常见插件及总结
const sass = require('grunt-sass')
const loadGruntTask = require('load-grunt-tasks')

module.export = grunt => {

    grunt.initConfig({
        sass: {
            options: {
                sorceMap: true,
                implementation: sass
            },
            main: {
                file: {
                    // 目标文件路径：原文件路径
                    'dist/css/main.css':'src/css/main.css'
                }

            }
        },
        babel: {
            options: {
                sorceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                file: {
                    // 目标文件路径：原文件路径
                    'dist/js/app.js':'src/js/app.js'
                }                
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['babel'],
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass'],
            }
        }
    })

    // // 加载插件中的任务
    // grunt.loadNpmTasks('grunt-sass')
    // // 自动加载所有的 grunt 插件中任务
    // loadGruntTask(grunt)
    
    grunt.registerTask('default', ['sass', 'babel', 'watch'])

    


}