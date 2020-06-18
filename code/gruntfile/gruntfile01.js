// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接收一个 grunt 的形参， 内部提供一些创建任务时可以用到的 API

module.export = grunt => {
    grunt.registerTask('bad', () => {
        console.log('bad working-')
        return false
    })

    grunt.registerTask('foo', () => {
        console.log('hello grunt-')
    })

    grunt.registerTask('bar', '任务描述', () => {
        console.log('bar task~')
    })


    grunt.registerTask('default', ['foo', 'bad', 'bar'])

   
    grunt.registerTask('async-task', function () {
        const done = this.async()
        setTimeout(() => {
            console.log('async task working~')
            done(false)
        }, 1000);
    })
}