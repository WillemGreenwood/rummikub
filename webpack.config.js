var path = require('path');

const clientConfig = {
    target: 'web',
    mode: "development",
    entry: path.join(__dirname, './src/client/app.tsx'),
    module: {
        rules: [
            {
                test: /src\/client\/.*\.(ts|js)x?$/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/dist/client'
    }
};

const serverConfig = {
    target: 'node',
    mode: "development",
    entry: path.join(__dirname, './src/server/app.ts'),
    module: {
        rules: [
            {
                test: /src\/server\/.*\.(ts|js)x?$/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js']
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/dist/server'
    }
};

module.exports = [clientConfig, serverConfig];
