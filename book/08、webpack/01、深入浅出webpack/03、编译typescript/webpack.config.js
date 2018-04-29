module.exports = {
    entry: {
        'app': './src/app.ts'
    },

    output: {
        filename: "[name].bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                }
            }
        ]
    }
};