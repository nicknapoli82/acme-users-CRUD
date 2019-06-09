const path = require('path');

module.exports = {
  devServer: {
    contentBase: 'public',
  },
  entry: [
    '@babel/polyfill', // enables async-await
    path.join(__dirname, 'src', 'index.js')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
	test: /\.(js|jsx)/,
	exclude: /node_modules/,
	use: {
	  loader: "babel-loader"
	}
      }
    ]
  }
};
