const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DelWebpackPlugin = require('del-webpack-plugin');

const BASE_DIR = 'client';
const PUBLIC_DIR = 'public'
const SRC_DIR = 'src'

const config = {
    context: path.resolve(__dirname, BASE_DIR),
    entry: {
        vendor: './src/vendor.bundle.js',
        app: [
            'event-source-polyfill',
            'webpack-hot-middleware/client?reload=true',
            `./${SRC_DIR}/app.bundle.js`
        ],
    },
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.resolve(__dirname, BASE_DIR, PUBLIC_DIR),
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader!awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    devtool: 'cheap-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['vendor', 'app'],
            chunksSortMode: 'manual',
            template: `./${SRC_DIR}/index.html`,
        }),
        new DelWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

module.exports = config;
