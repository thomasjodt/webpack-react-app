const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

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
  exclude: /favicon\.png/,
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
const alias = {
  '@public':path.resolve(__dirname, './public'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@styles': path.resolve(__dirname, './src/styles'),
  '@icons': path.resolve(__dirname, './src/assets/icons'),
  '@images': path.resolve(__dirname, './src/assets/images'),
  '@components': path.resolve(__dirname, './src/components'),
}

module.exports = (arg) => {
  const {mode} = arg
  const isProduction = mode === 'production'
  return {
    entry: './src/main.js',
    output: {
      filename: isProduction
      ? 'main.[contenthash].js' 
      : 'main.js',
      path: path.resolve(__dirname, 'build'),
      assetModuleFilename: 'images/[name][hash][ext][query]',
      clean: true
    },
    module: {rules},
    resolve: {
      extensions: ['.js', '.jsx', '.mjs'],
      alias
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: './public/index.html',
        favicon: './public/favicon.png'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css'
      }),
    ],
    devServer: {
      static: { directory: path.join(__dirname, 'build') },
      open: true,
      port: 3000,
      compress: true
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()]
    }
  }
}