const withTM = require("next-transpile-modules")(["@mui/material"]); // pass the modules you would like to see transpiled
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");
const process = require("process");

const config = {
	i18n,
	reactStrictMode: true,
	pwa: {
		disable: process.env.NODE_ENV === "development",
		dest: "public",
		register: true,
		skipWaiting: true,
		runtimeCaching,
		buildExcludes: [/middleware-manifest.json$/],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.mp3$/,
			use: {
				loader: "file-loader",
				options: {
					publicPath: "/_next/static/sounds/",
					outputPath: "static/sounds/",
					name: "[name].[ext]",
					esModule: false,
				},
			},
		});
		return config;
	},
};

const pwa = withPWA(config);

module.exports = withTM(pwa);
