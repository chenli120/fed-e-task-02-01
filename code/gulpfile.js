// gulp基本使用
// gulp 的入口文件

// exports.foo = () => {
//     console.log('foo task working~') // The following tasks did not complete: foo
// }



// 取消了同步代码模式，约定每个任务都是异步任务，在任务完成后需要调用回调函数或者其他方法标志任务结束
exports.foo = done => {
    console.log('foo task working~')
    done() // 标识任务完成
}

exports.default = done => {
    console.log('default task working~')
    done()
}