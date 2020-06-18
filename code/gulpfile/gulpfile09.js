// 封装工作流-解决木块中的问题


const { src, dest, parallel, series } = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')

const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()
const cwd = process.cwd() // 返回当前命令行所在的工作目录
let config = {
  // default onfig
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}

try {
  const loadconfig = require(`${cwd}/pages.config.js`)
  cpnfig = Object.assign({},config,loadconfig)
} catch (e) {

}

const clean = () => {
    return del[config.build.dist, config.build.temp]
}

const style = () => {
    return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src }) 
        .pipe(plugins.sass({ outputStyle: 'expanded' })) 
        .pipe(dest(config.build.temp))
}

const script = () => {
    return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src } )
        .pipe(plugins.babel({ presets: [require('@babel/preset-env')] })) // babel()默认只是一个转换平台，preset是一些插件的结合
        .pipe(dest(config.build.temp))
}

// 页面模板编译
const page = () => {
    return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src } )
        .pipe(plugins.swig({ data: config.data })) // config
        .pipe(dest(config.build.temp))
}


// 图片转换
// yarn add gulp-imagemin --dev //通过二进制
const image = () => {
    return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src } )
        .pipe(plugins.imagemin()) // swig()模板引擎插件, data代替页面中的数据
        .pipe(dest(config.build.dist))
}


// 字体文件转换
// yarn add gulp-imagemin --dev //通过二进制
const font = () => {
    return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src } )
        .pipe(plugins.imagemin()) // swig()模板引擎插件, data代替页面中的数据
        .pipe(dest(config.build.dist))
}

// 其他文件
const extra = () => {
    return src('**', { base: config.build.public, cwd: config.build.public }) 
        .pipe(dest(config.build.dist))
}

// 开发服务器
const serve = () => {
  // 监视 自动更新到编译任务中，更改dist, 文件更改后自动编译，自动更新浏览器 yarn add watch-cli
  watch(config.build.styles, {cwd: config.build.src},style)
  watch(config.build.scripts, {cwd: config.build.src}, script)
  watch(config.build.pages, {cwd: config.build.src}, page)
  // 以下的编译在开发阶段不是太有意义，无损压缩，不影响展示，开发阶段编译会降低构建速度，发布上线之前监视可以了。
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)

  // 减少构建次数
  watch([
    config.build.path.images, 
    config.build.path.fonts
  ],{cwd: config.build.src},  bs.reload)

  watch('**',{cwd: config.build.public},  bs.reload)

  // 初始化服务器
  bs.init({
    serve: {
      notify: false, // 取消
      port: 2080, // 端口
      // open: false, // 启动时立即打开浏览器的功能 去掉 默认true
      files: 'dist/**', // 监听文件，文件更改立即同步更新浏览器
      // baseDir: config.build.dist,
      baseDir: [config.build.temp, config.build.dist, config.build.public], // 配合监视 提高构建效率
      routes: { //优先于baseDir
        '/node_modules' : 'node_modules'
      }
    }
  })
}

// useref文件引用处理
const useref = () => {
  return src(config.build.path.pages, { base: config.build.temp })
      .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
      // html css js 压缩
      .pipe(plugins.if(/\.js$/), plugins.uglify())
      .pipe(plugins.if(/\.css$/), plugins.cleanCss())
      .pipe(plugins.if(/\.html$/), plugins.htmlmin({
        collapseWhitespace: true ,
        minifyCSS: true, // 内部样式
        minifyJS: true
      }))
      .pipe(dest(config.build.dist))
}

// 组合并行任务
const compile = parallel(style, script, page)

// 发布 上线之前执行的任务
const build = series(clean , parallel(series(compile, useref), image, font, extra))

// 开发阶段
const develop = series(compile, serve)

module.exports = {
    clean,
    build,
    develop
}
