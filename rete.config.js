export default {
    input: 'src/index.ts',
    name: 'ReadonlyPlugin',
    babelPresets: [
        require('@babel/preset-typescript')
    ],
    extensions: ['.js', '.ts'],
    globals: { 'rete': 'Rete' }
}