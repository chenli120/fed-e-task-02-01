const { src, dest, parallel, series } = require('gulp')

const del = require('del')

// const sass = require('gulp-plugins.sass')
// const babel = require('gulp-babel')
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

// 自动加载插件
// yarn add gulp-load-plugins --dev
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()


// 模板页面数据
const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }

// 文件清除
// yarn add del --dev  //非Gulp插件，但是可以在Gulp中使用 Promise任务
const clean = () => {
    return del['dist']
}

// 样式
// yarn add gulp-sass --dev
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' }) // base:配置基准路径,保留原始的目录结构
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // sass(): _ 下划线开头的样式文件不会被转换; outputStyle: 'expanded':文件内容完全展开
        .pipe(dest('dist'))
}

// 脚本
// yarn add gulp-babel --dev
// yarn add @babel/core @babel/preset-env --dev
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' }) 
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] })) // babel()默认只是一个转换平台，preset是一些插件的结合
        .pipe(dest('dist'))
}

// 页面模板编译
const page = () => {
    return src('src/*.html', { base: 'src' }) 
        .pipe(plugins.swig({ data, defaults: { cache: false }  })) // swig()模板引擎插件, data代替页面中的数据
        .pipe(dest('dist'))
}


// 图片转换
// yarn add gulp-imagemin --dev //通过二进制
const image = () => {
    return src('src/assets/images/**', { base: 'src' }) 
        .pipe(plugins.imagemin()) // swig()模板引擎插件, data代替页面中的数据
        .pipe(dest('dist'))
}


// 字体文件转换
// yarn add gulp-imagemin --dev //通过二进制
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' }) 
        .pipe(plugins.imagemin()) // swig()模板引擎插件, data代替页面中的数据
        .pipe(dest('dist'))
}

// 其他文件
const extra = () => {
    return src('public/**', { base: 'public' }) 
        .pipe(dest('dist'))
}

// 组合并行任务
const compile = parallel(style, script, page, image, font)

// 发布
const build = series(clean , parallel(compile, extra))

module.exports = {
    compile,
    build
}

// module.exports = {
//     style,
//     script,
//     page
// }