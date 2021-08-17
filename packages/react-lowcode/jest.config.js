module.exports = {
  "globals": {
    "extensionsToTreatAsEsm": ['.ts', '.js'],
    'ts-jest': {
        useESM: true
    }
  },
  "preset": 'ts-jest/presets/js-with-ts-esm',
  "transformIgnorePatterns": [
    'node_modules/(?!(@iteria-app)/)' 
  ]
};