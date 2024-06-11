module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
  ],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/sort-styles': 'off',
    'react-native/no-color-literals': 'off',  // Disable 'react-native/no-color-literals' rule
    'react-native/no-single-element-style-arrays': 'off',  // Disable 'react-native/no-single-element-style-arrays' rule
    'react-native/no-inline-styles': 'off',  // Disable 'react-native/no-inline-styles' rule
    'import/order': 'off',
    'import/no-unresolved': 'off',  // Disable 'import/no-unresolved' rule
    'import/namespace': 'off',  // Disable 'import/namespace' rule
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
