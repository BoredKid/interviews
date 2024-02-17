module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'react/prop-types': ['off'],
    complexity: ['error', 8],
    'max-statements': ['error', 40],
    'max-lines': ['error', 900],
    'max-params': ['error', 5],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    semi: ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'no-irregular-whitespace': 'error',
    camelcase: ['warn', { properties: 'always' }],
    'no-console': ['warn'],
    'react/display-name': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        arrowParens: 'always',
        printWidth: 120,
        singleQuote: true
      }
    ]
  }
};