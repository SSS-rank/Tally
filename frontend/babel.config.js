module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./frontend/app'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './frontend/app',
          '@components': './frontend/app/components',
          '@screens': './frontend/app/screens',
          '@assets': './frontend/app/assets',
        },
      },
    ],
  ],
};
