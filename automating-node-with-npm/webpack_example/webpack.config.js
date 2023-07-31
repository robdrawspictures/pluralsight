const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = path.resolve(__dirname, 'dist');
const entry = path.join(__dirname, './src/client/', 'client.js');

module.exports = {
    mode: 'development',
    entry: entry,
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].vendor.js',
        path: outputDirectory,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: './src/client/**/*', to: outputDirectory, flatten: true, ign}
        ])
    ]
}

// This particular course is fucking useless because the guy doesn't bother his arse to
// provide the necessary files or even show all the code in the video, so all you can do
// is watch along.

// Just in case you ever come back to this and wonder why it's half-finished: This was
// all I was able to piece together pausing the video, but it won't run because huge
// chunks are missing.