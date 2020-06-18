
// Grunt 多目标任务

module.export = grunt => {
    
    grunt.initConfig({
        build: {
            //options作为任务的配置选项
            options: {
                foo: 'bar'
            },
            // css: '1',
            css: {
                // 会覆盖任务中的配置选项
                options: {
                    foo: 'baz'
                },
            },
            js: '2'
        }
    })

    // 多目标模式，可以让任务根据配置形成多个子任务
    grunt.registerMultiTask('build', function () {
        // console.log('build task')
        console.log(this.options())
        // target：当前任务，data：当前任务的值
        console.log(`target: ${this.target}, data: ${this.data}`)
    })

}