module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '' : '/',
    // 构建项目生成的目录
    outputDir: process.env.NODE_ENV === 'production' ?
        'dist' : 'devDist',
    // 关闭语法的自动检测
    lintOnSave: false,
    // 配置css
    // https://cli.vuejs.org/zh/config/#css-modules
    css: {
        loaderOptions: {

            scss: {
                prependData: `@import "./src/styles/main.scss";`
            },

        }
    }
}