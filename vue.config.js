module.exports = {
    lintOnSave: false,
    pages: {
        index: {
            entry: 'src/turntable-main.js',
            template: 'public/index.html',
            filename: 'turntable-index.html',
            title: '幸运转盘'
        },
        lotIndex: {
            entry: 'src/lot-main.js',
            template: 'public/index.html',
            filename: 'lot-index.html',
            title: '求签'
        }
    },
    devServer: {
        port: 8801
    }
}