"use strict";

const path = require("path");

module.exports = {
	activate(state) {
		const petiPath = atom.packages.getLoadedPackage("peti-ui").path;
		const settings = require(path.join(petiPath, "lib", "settings"));

		settings.init();
	},
};
