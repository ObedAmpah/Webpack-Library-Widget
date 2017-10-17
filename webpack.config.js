const path = require('path')
const webpack = require('webpack')

const paths = {
    appRoot: __dirname
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'widget.js',
        library: 'JSWidget',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'env', 'stage-2']
                }
            }]
        }]
    }
}