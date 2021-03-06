module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js'],
        alias: {
          '@actions': './redux/actions',
          '@api': './src/api',
          '@common': './src/common',
          '@components': './src/components',
          '@consts': './src/consts',
          '@helpers': './src/helpers',
          '@navigation': './src/navigation',
          '@reducers': './src/reducers',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@saga': './src/saga',
          '@selectors': './src/selectors',
        },
      },
    ],
  ],
};
