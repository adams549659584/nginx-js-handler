import { defineConfig } from 'rollup';
// 告诉 Rollup 如何查找外部模块
import { nodeResolve } from '@rollup/plugin-node-resolve';
// 将 CommonJS 转换成 ES2015 模块
import commonjs from '@rollup/plugin-commonjs';
// 根据.map文件内容 加载源文件和在调试模式中关联源码和编译后代码
import sourceMaps from 'rollup-plugin-sourcemaps';
// Compile TypeScript files
import typescript from '@rollup/plugin-typescript';
// 令 Rollup 从 JSON 文件中读取数据
// import json from '@rollup/plugin-json';
// 对输出内容压缩
import { terser } from 'rollup-plugin-terser';
import * as fs from 'fs';
import * as path from 'path';

// njs 一定要 export default
import exportDefaultHandler from './plugins/rollup-plugin-export-default-handler.js';

// const pkg = require('./package.json');

const njsEntries = (entryPath = '') => {
  const entryFullPath = path.resolve(entryPath);
  return fs.readdirSync(entryFullPath).map(file => path.join(entryFullPath, file));
};

export default defineConfig({
  input: njsEntries('src/njsEntries'),
  output: {
    dir: 'lib',
    format: 'esm',
    sourcemap: false,
  },
  plugins: [
    // Allow json resolution
    // json(),
    // Compile TypeScript files
    typescript(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    nodeResolve(),
    exportDefaultHandler(),
    terser(),
    // Resolve source maps to the original source
    sourceMaps(),
  ],
});
