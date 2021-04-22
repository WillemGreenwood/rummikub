var path = require('path');

const clientConfig = {
    target: 'web',
    mode: "development",
    entry: path.join(__dirname, './src/client/app.tsx'),
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: ['/node_modules/'],
                use: {
                    loader: 'babel-loader'
                }
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
                test: /\.(ts|js)x?$/,
                exclude: ['/node_modules/'],
                use: {
                    loader: 'babel-loader'
                }
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
