//só aceita o common Js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'), //é o arquivo que chama o reactDOM.render
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle[hash].js' //resolve o cache
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, //exclui a pasta node_modules que já são transpilados
                use: 'babel-loader'
            },            
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                        'style-loader', 
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                        'sass-loader'
                    ],
            }
        ],
    },

    devServer: {
        port: 3000,
        historyApiFallback: true
    }

};