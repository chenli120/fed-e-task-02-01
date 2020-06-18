// gulp 异步任务的三种方式
const { series, parallel } = require('gulp')
const fs = require('fs')

// 1 回调函数 --错误优先回调函数
exports.callback = done => {
    console.log('callback task~')
    done()
}

exports.callback_error = done => {
    console.log('callback task~')
    done(new Error('task failes!'))
}

// promise
exports.promise = done => {
    console.log('promise task~')
    return Promise.resolve()
}

exports.promise_error = done => {
    console.log('promise task~')
    return Promise.reject(new Error('task failes!'))
}

exports.timeout = time => {
    return new Promise(resolve => {
        setTimeout(() => resolve, time);
    })
}

exports.async = async () => {
    await timeout(1000)
    console.log('async task~')
}


// stream
exports.stream = done => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    readStream.on('end', () => {
        done()
    })
}