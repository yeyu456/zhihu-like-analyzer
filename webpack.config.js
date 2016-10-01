require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');

const src = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');

module.exports = {
    entry : {
        content : ['babel-polyfill', path.join(src, 'content')],
        background: path.join(src, 'background')
    },
    output : {
        path : buildPath,
        filename: '[name].js'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    devtool : 'inline-source-map',
    module : {
        loaders : [
            {
                loader : 'babel-loader',
                include : [
                    src
                ],
                test : /\.js$/,
                query : {
                    presets : [
                        'es2015',
                        'es2016',
                        'es2017',
                        'stage-2',
                        'stage-3'
                    ],
                    plugins: [
                    ]
                }
            }
        ]
    }
};
