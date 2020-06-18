
// Grunt 多目标任务

module.export = grunt => {

    grunt.initConfig({
        clean: {
        //    temp: 'temp/app.js' //删除具体文件
        //    temp: 'temp/*.txt' //删除具体文件
           temp: 'temp/**' //清除temp下所有文件（子目录及子目录下的文件）
        }
    })

    // 加载插件中的任务
    grunt.loadNpmTasks('grunt-contrib-clean')

    // 执行命令： yarn grunt clean
    


}