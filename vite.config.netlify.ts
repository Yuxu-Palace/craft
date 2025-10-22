import netlify from '@netlify/vite-plugin-tanstack-start';
import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [netlify()],
  }),
);
