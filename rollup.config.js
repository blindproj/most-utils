import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/most-utils.js',
    name: 'mostUtils',
    sourceMap: true,
    format: 'umd',
  },
  plugins: [
    typescript(),
    resolve(),
  ]
}