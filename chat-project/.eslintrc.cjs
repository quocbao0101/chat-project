module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       paths: ['src'],
  //       extensions: ['.js', '.jsx'],
  //     },
  //   },
  // },
};
