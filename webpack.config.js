module.exports = {
  entry: './scripts/source/entry.js',
  output: {
    filename: './scripts/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
