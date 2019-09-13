module.exports = {
  entry: {
    main: './src/client/js/main.js',
    room: './src/client/js/rooms.js',
    game: './src/client/js/game.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + "./dist/client/js"
  },
  module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
  }
}
