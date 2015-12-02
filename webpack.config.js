"use strict";
var path = require('path');
var webpack = require('webpack');


var common = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './app/index.jsx'
    ],
    /* add resolve.extensions */
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            /* set up jsx */
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/,
                include: __dirname+'/app'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()

    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
};

module.exports = common;