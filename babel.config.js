module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.android.ts',
          '.android.tsx',
          '.ios.ts',
          '.ios.tsx',
          '.js',
          '.json',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ],
};
