import * as esbuild from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiRoot = join(__dirname, '..');

await esbuild.build({
  entryPoints: [join(apiRoot, 'contact', 'index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node24',
  format: 'esm',
  outfile: join(apiRoot, 'contact', 'index.js'),
  external: ['@azure/functions'],
  sourcemap: true,
});
