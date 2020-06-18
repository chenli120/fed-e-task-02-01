
// Grunt 的配置方法

module.export = grunt => {
    // grunt.initConfig({
    //     foo: 'bar'
    // })
    
    grunt.initConfig({
        foo: {
            bar: 123
        }
    })


    grunt.registerTask('foo', () => {
        // console.log(grunt.config('foo'))
        console.log(grunt.config('foo.bar'))
    })

}