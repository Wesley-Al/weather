const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = mergeConfig(defaultConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
});

module.exports = wrapWithReanimatedMetroConfig(config);