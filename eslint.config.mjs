import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:prettier/recommended', // isso foi adicionado
  ),
  {
    rules: {
      'no-console': 'error', // impede o uso de console.log
      'no-alert': 'error', // impede o uso de alert (vamos ter que comentar isso)
    },
  },
];

export default eslintConfig;
