const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')

const htmlRules = { 
  test: /\.html$/, 
  use: ['html-loader'] 
}
const styleRules = {
  test: /\.(sa|sc|c)ss$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader']
}
const jsRules = {
  test: /\.(m?js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  
}
const imageRules = {
  test: /\.(jpe?g|png|gif|svg)$/,
  type: 'asset/resource'
}
const fontRules = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
  generator: {
      filename: 'assets/fonts/[name].[hash][ext][query]',
  }
}

const rules = [htmlRules, styleRules, jsRules, imageRules, fontRules]

module.exports = (env, argv) => {
  const { mode } = argv
  const isProduction = mode === 'production'
  
  if (isProduction) {

    return {
      mode: 'production',
      entry: './src/main.js',
      output: {
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        assetModuleFilename: 'images/[name][hash][ext][query]',
        clean: true
      },
      module: {rules},
      resolve: { extensions: ['.js', '.jsx', '.mjs'] },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './public/index.html',
          favicon: './public/favicon.png'
        }),
        new MiniCssExtractPlugin({
          filename: 'styles/[name].[contenthash].css'
        }),
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ]
      },
    }

  } else {

    return {
      mode: 'development',
      entry: './src/main.js',
      output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        assetModuleFilename: 'images/[name][ext]',
        clean: true
      },
      module: {rules},
      resolve: { extensions: ['.js', '.jsx', '.mjs'] },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './public/index.html',
          favicon: './public/favicon.png'
        }),
        new MiniCssExtractPlugin({
          filename: 'styles/[name].css'
        })
      ],
      devServer: {
        static: { directory: path.join(__dirname, 'build') },
        open: true,
        port: 3000,
        compress: true,
        historyApiFallback: true,
        client: { overlay: true }
      },
      devtool: 'source-map'
    }

  }
}