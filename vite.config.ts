import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import type { PluginOptions } from 'babel-plugin-react-compiler';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      router: {
        generatedRouteTree: 'route-tree.gen.ts',
        routeTreeFileHeader: [
          '// @ts-nocheck',
          '/** biome-ignore-all lint: auto generated file, do not modify */',
          '/** biome-ignore-all assist/source/organizeImports: auto generated file, do not modify */',
        ],
      },
    }),
    viteReact({
      babel: {
        plugins: [['babel-plugin-react-compiler', {} satisfies PluginOptions]],
      },
    }),
  ],
});

export default config;
