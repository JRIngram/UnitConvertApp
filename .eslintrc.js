module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
      'react',
      "react-native"
    ],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      "plugin:react/recommended",
      'prettier'
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "react-native/react-native": true
    },
    "rules": {
        "react-native/no-unused-styles": 2,
        "react-native/split-platform-components": 2,
        "react-native/no-inline-styles": 2,
        "react-native/no-color-literals": 2,
        "react-native/no-raw-text": 2,
        "react-native/no-single-element-style-arrays": 2,
      }
    
};