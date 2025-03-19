import prettierConfig from './.prettierrc';

export default [
  {
    plugins: ['prettier'],
    extends: ['plugin:prettier/recommended'],
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
];
