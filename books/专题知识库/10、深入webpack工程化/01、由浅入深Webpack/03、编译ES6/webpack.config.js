module.exports = {
    entry: {
        app: './app.js'
    },
    output: {
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }
        ]
    }
};