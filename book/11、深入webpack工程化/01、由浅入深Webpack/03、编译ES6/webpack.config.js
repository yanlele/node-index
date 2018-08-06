module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: "[name].[hash:8].js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browers: ['>1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/node_modules/'
            }
        ]
    }
};