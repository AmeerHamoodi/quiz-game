module.exports = {
  entry: "./src/client/js/main.js",
  output: "./dist/client/js/bundle.js",
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
