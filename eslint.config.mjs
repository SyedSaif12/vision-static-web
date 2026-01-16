import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // This line handles the translation of old "extends" into the new format
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
