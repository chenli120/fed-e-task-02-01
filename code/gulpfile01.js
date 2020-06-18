// gulp 创建组合任务

const { series, parallel } = require('gulp')

exports.task1 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000);
   
}


exports.task2 = done => {
    setTimeout(() => {
        console.log('task2working~')
        done()
    }, 1000);
   
}


exports.task3 = done => {
    setTimeout(() => {
        console.log('task3 working~')
        done()
    }, 1000);
   
}

// 串行
exports.foo = series(task1,task2,task3)
// 并行
exports.bar = parallel(task1,task2,task3)