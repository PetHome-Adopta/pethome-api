const path = require('path');

module.exports = [{
    mode: "production",
    target: "node",
    stats: {
        warnings: false
    },
    entry: {
        'pethome': './src/app.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: ['mongodb-client-encryption']
}];