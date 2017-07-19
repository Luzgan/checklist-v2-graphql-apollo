const path = require('path');

module.exports = {
  entry: './client/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js[x]{0,1}$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
