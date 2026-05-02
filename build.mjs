#!/usr/bin/env node
/**
 * Bundle the plugin template into a standalone third-party plugin.
 *
 * Output directory (dist/) contains:
 *   - index.js        (self-contained ESM bundle)
 *   - index.js.map    (source map)
 *
 * Usage:  node build.mjs [--watch]
 */

import { build, context } from 'esbuild'
import { myndraHostModules } from '@myndra/plugin-sdk/build'
import { join, dirname } from 'node:path'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, 'dist')
const watch = process.argv.includes('--watch')

mkdirSync(outDir, { recursive: true })

const buildOptions = {
  entryPoints: [join(__dirname, 'src/index.ts')],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  outfile: join(outDir, 'index.js'),
  treeShaking: true,
  sourcemap: true,
  plugins: [myndraHostModules()],
}

if (watch) {
  const ctx = await context(buildOptions)
  await ctx.watch()
  console.log('Watching for changes...')
} else {
  await build(buildOptions)
  console.log('Done. Output in dist/')
}
