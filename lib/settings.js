"use strict";

const fs = require("fs");
const path = require("path");

const Utility = require("./utility");

module.exports = {
	init(state) {

		const self = this;

		// TAB SIZE
		self.tabSize(atom.config.get("peti-ui.compactView"));
		// TITLE BAR
		self.hideTitleBar(atom.config.get("peti-ui.hideTitleBar"));
		// SHOW DOCUMENT TITLE
		self.hideDocumentTitle(atom.config.get("peti-ui.hideDocumentTitle"));
		// PROJECT TAB
		self.hideProjectTab(atom.config.get("peti-ui.hideProjectTab"));
		// DISPLAY IGNORED FILES
		self.ignoredFiles(atom.config.get("peti-ui.displayIgnored"));
		// HIDE TABS
		self.hideTabs(atom.config.get("peti-ui.hideTabs"));
		// SET THEME
		self.setTheme(atom.config.get("peti-ui.themeColor"), false, false);
		// ANIMATIONS
		self.animate(atom.config.get("peti-ui.disableAnimations"));

		return atom.config.onDidChange("peti-ui.themeColor", value => self.setTheme(value.newValue, value.oldValue, true));
	},

	package: atom.packages.getLoadedPackage("peti-ui"),

	// RELOAD WHEN SETTINGS CHANGE
	refresh() {
		const self = this;
		self.package.deactivate();
		return setImmediate(() => self.package.activate());
	},

	// SET THEME COLOR
	setTheme(theme, previous, reload) {
		const self = this;
		const el = document.querySelector("atom-workspace");

		// GET OUR PACKAGE INFO
		const pkg = atom.packages.getLoadedPackage("peti-ui");

		// THEME DATA
		let themeData = "@seti-primary: @" + theme.toLowerCase() + ";";
		themeData = themeData + "@seti-primary-text: @" + theme.toLowerCase() + "-text;";
		themeData = themeData + "@seti-primary-highlight: @" + theme.toLowerCase() + "-highlight;";

		// SAVE TO ATOM CONFIG
		atom.config.set("peti-ui.themeColor", theme);

		// SAVE USER THEME FILE
		return fs.writeFile(pkg.path + "/styles/user-theme.less", themeData, function(err) {
			if (!err) {
				if (previous) {
					el.classList.remove("seti-theme-" + previous.toLowerCase());
					el.classList.add("seti-theme-" + theme.toLowerCase());
				}
				if (reload) {
					return self.refresh();
				}
			}
		});
	},

	// SET TAB SIZE
	animate(val) {
		return Utility.applySetting({
			action: "addWhenFalse",
			config: "peti-ui.disableAnimations",
			el: [
				"atom-workspace"
			],
			className: "seti-animate",
			val,
			cb: this.animate
		});
	},

	// SET TAB SIZE
	tabSize(val) {
		return Utility.applySetting({
			action: "addWhenTrue",
			config: "peti-ui.compactView",
			el: [
				"atom-workspace"
			],
			className: "seti-compact",
			val,
			cb: this.tabSize
		});
	},

	// HIDE TITLE BAR
	hideTitleBar(val) {
		return Utility.applySetting({
			action: "addWhenTrue",
			config: "peti-ui.hideTitleBar",
			el: [
				"atom-workspace"
			],
			className: "hide-title-bar",
			val,
			cb: this.hideTitleBar
		});
	},

	// HIDE DOCUMENT TITLE
	hideDocumentTitle(val) {
		return Utility.applySetting({
			action: "addWhenTrue",
			config: "peti-ui.hideDocumentTitle",
			el: [
				"atom-workspace"
			],
			className: "hide-document-title",
			val,
			cb: this.hideDocumentTitle
		});
	},

	// HIDE DOCUMENT TITLE
	hideProjectTab(val) {
		return Utility.applySetting({
			action: "addWhenTrue",
			config: "peti-ui.hideProjectTab",
			el: [
				"atom-workspace"
			],
			className: "hide-project-tab",
			val,
			cb: this.hideProjectTab
		});
	},


	// SET WHETHER WE SHOW TABS
	hideTabs(val) {
		Utility.applySetting({
			action: "addWhenTrue",
			config: "peti-ui.hideTabs",
			el: [
				"atom-workspace"
			],
			className: "seti-hide-tabs",
			val,
			cb: this.hideTabs
		});
	},
	// SET IF WE SHOW IGNORED FILES
	ignoredFiles(val) {
		return Utility.applySetting({
			action: "addWhenFalse",
			config: "peti-ui.displayIgnored",
			el: [
				".file.entry.list-item.status-ignored",
				".directory.entry.list-nested-item.status-ignored"
			],
			className: "seti-hide",
			val,
			cb: this.ignoredFiles
		});
	}
};
