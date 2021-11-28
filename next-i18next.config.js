const path = require("path");

module.exports = {
	i18n: {
		defaultLocale: "en",
		locales: ["en", "de", "es", "fr", "it", "nl"],
	},
	localeDetection: true,
	localePath: path.resolve("./public/static/locales"),
};
