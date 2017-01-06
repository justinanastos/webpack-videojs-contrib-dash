// @flow
import path from "path";

const projectName = require("./package.json").name;

export default {
    context: path.resolve(__dirname, "src"),
    debug: true,
    devtool: "#eval-source-map",
    entry: [
        "./js/entry-point.jsx",
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                include: [
                    // This will use babel to transpile the dash source. If we don't use the
                    // `alias`, this is not necessary.
                    path.resolve(__dirname, "node_modules/videojs-contrib-dash"),
                    path.resolve(__dirname, "src/js"),
                ],
                // Cache babel output so rebuilds are faster.
                query: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.json?$/,
                loader: "json",
            },
        ],
    },
    output: {
        filename: `${projectName}.js`,
        path: "./src/dist/",
        publicPath: "/src/",
        sourceMapFilename: "[file].map",
    },
    resolve: {
        alias: {
            // Use `alias` to use videojs-contrib-dash src instead of transpiled output. This is
            // *not* necessary for dash to work, but it is nice for seeing error messages from
            // source instead of babel output when we're messing with dash internals.
            "videojs-contrib-dash": path.resolve(__dirname, "./node_modules/videojs-contrib-dash/src/js/videojs-dash.js"),
        },
        extensions: [
            "",
            ".js",
            ".jsx",
        ],
    },
};
