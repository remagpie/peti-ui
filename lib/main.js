"use strict";

const fs = require("fs");
const path = require("path");

function toggleClass(value, className, selector) {
	for (const s of selector) {
		for (const element of document.querySelectorAll(s)) {
			if (value) {
				element.classList.add(className);
			} else {
				element.classList.remove(className);
			}
		}
	}
}

const onConfigChange = {
	// TAB SIZE
	"peti-ui.compactView": (value) => toggleClass(value, "seti-compact", [
		"atom-workspace",
	]),
	// TITLE BAR
	"peti-ui.hideTitleBar": (value) => toggleClass(value, "hide-title-bar", [
		"atom-workspace",
	]),
	// SHOW DOCUMENT TITLE
	"peti-ui.hideDocumentTitle": (value) => toggleClass(value, "hide-document-title", [
		"atom-workspace",
	]),
	// PROJECT TAB
	"peti-ui.hideProjectTab": (value) => toggleClass(value, "hide-project-tab", [
		"atom-workspace",
	]),
	// DISPLAY IGNORED FILES
	"peti-ui.displayIgnored": (value) => toggleClass(!value, "seti-hide", [
		".file.entry.list-item.status-ignored",
		".directory.entry.list-nested-item.status-ignored",
	]),
	// HIDE TABS
	"peti-ui.hideTabs": (value) => toggleClass(value, "seti-hide-tabs", [
		"atom-workspace",
	]),
	// ANIMATIONS
	"peti-ui.disableAnimations": (value) => toggleClass(!value, "seti-animate", [
		"atom-workspace",
	]),
	// SET THEME
	"peti-ui.themeColor": (value, prev) => {
		// GET OUR PACKAGE INFO
		const pkg = atom.packages.getLoadedPackage("peti-ui");

		const fontFamily = atom.config.get("peti-ui.fontFamily");

		// THEME DATA
		let themeData = "@seti-primary: @" + value.toLowerCase() + ";";
		themeData += "@seti-primary-text: @" + value.toLowerCase() + "-text;";
		themeData += "@seti-primary-highlight: @" + value.toLowerCase() + "-highlight;";
		themeData += "@seti-font-family: " + fontFamily + ";";
		themeData += "@font-family: " + fontFamily + ";";

		// SAVE USER THEME FILE
		fs.writeFile(path.join(pkg.path, "styles", "user-theme.less"), themeData, (err) => {
			if (err) {
				return;
			}

			if (prev != null) {
				const el = document.querySelector("atom-workspace");
				el.classList.remove("seti-theme-" + prev.toLowerCase());
				el.classList.add("seti-theme-" + value.toLowerCase());

				pkg.deactivate();
				setImmediate(() => pkg.activate());
			}
		});
	},
	// SET FONT
	"peti-ui.fontFamily": (value, prev) => {
		// GET OUR PACKAGE INFO
		const pkg = atom.packages.getLoadedPackage("peti-ui");

		const themeColor = atom.config.get("peti-ui.themeColor");

		// THEME DATA
		let themeData = "@seti-primary: @" + themeColor.toLowerCase() + ";";
		themeData += "@seti-primary-text: @" + themeColor.toLowerCase() + "-text;";
		themeData += "@seti-primary-highlight: @" + themeColor.toLowerCase() + "-highlight;";
		themeData += "@seti-font-family: " + value + ";";
		themeData += "@font-family: " + value + ";";

		// SAVE USER THEME FILE
		fs.writeFile(path.join(pkg.path, "styles", "user-theme.less"), themeData, (err) => {
			if (err) {
				return;
			}

			if (prev != null) {
				pkg.deactivate();
				setImmediate(() => pkg.activate());
			}
		});
	},
};

module.exports = {
	activate() {
		for (const [key, callback] of Object.entries(onConfigChange)) {
			callback(atom.config.get(key), null);
			atom.config.onDidChange(key, (value) => {
				if (value.oldValue !== value.newValue) {
					callback(value.newValue, value.oldValue);
				}
			});
		}
	},
};
