// gulp 文件插入 + 插件的使用

const {src, dest} = require('gulp')
const sass = reauire('gulp-sass')

exports.style = () => {
    return src('src/assets/styles/*.scss', { base: 'srcs'})
        .pipe(sass())
        .pipe(dest('dist'))
}

module.exports = {
    styles
}


