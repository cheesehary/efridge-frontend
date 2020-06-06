const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: '[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[local]_[hash:base64:5]' },
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp4)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 5000 },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
