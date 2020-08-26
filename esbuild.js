const { build } = require('esbuild');

build({
    entryPoints: ['./src/client.ts'],
    outfile: './dist/bundle.js',
    minify: true,
    bundle: true,
}).catch(() => process.exit(1));
