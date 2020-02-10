import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

export default {
    input: 'dev/js/app.js',
    output: {
        file: 'docs/js/app.js',
        format: 'iife',
        name: 'bundle'
    },
    plugins: [
        resolve({
            main: true,
            browser: true
        }),
        commonjs()
    ]
}