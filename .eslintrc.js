module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/order': 'on',
    'import/prefer-default-export': 'off',
    'sort-keys': 'on',
    'sort-vars': 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};