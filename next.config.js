const withTM = require("next-transpile-modules")(["@mui/material"]); // pass the modules you would like to see transpiled
const withPWA = require("next-pwa");
const { i18n } = require("./next-i18next.config");
const process = require("process");

const config = {
	i18n,
	reactStrictMode: true,
	pwa: {
		dest: "public",
		disable: process.env.NODE_ENV === "development",
	},
};

const pwa = withPWA(config);


module.exports = withTM(pwa);
