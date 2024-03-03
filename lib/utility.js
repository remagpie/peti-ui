"use strict";

module.exports = {
	// ADD CLASS WHEN CONDITIONAL IS FALSE
	addWhenFalse(obj) {
		// CONVERT TO AN ARRAY IF NOT
		if (!Array.isArray(obj.el)) {
			obj.el = [ obj.el ];
		}

		for (const selector of obj.el) {
			for (const element of document.querySelectorAll(selector)) {
				if (!obj.bool) {
					element.classList.add(obj.className);
				} else {
					element.classList.remove(obj.className);
				}
			}
		}
	},
	// ADD CLASS WHEN CONDITIONAL IS TRUE
	addWhenTrue(obj) {
		// CONVERT TO AN ARRAY IF NOT
		if (!Array.isArray(obj.el)) {
			obj.el = [ obj.el ];
		}

		for (const selector of obj.el) {
			for (const element of document.querySelectorAll(selector)) {
				if (obj.bool) {
					element.classList.add(obj.className);
				} else {
					element.classList.remove(obj.className);
				}
			}
		}
	},
	applySetting(obj) {
		// APPLY A NEW SETTING
		atom.config.set(obj.config, obj.val);

		this[obj.action]({
			el: obj.el,
			className: obj.className,
			bool: obj.val
		});

		atom.config.onDidChange(obj.config, function(value) {
			if ((value.oldValue !== value.newValue) && (typeof obj.cb === "function")) {
				obj.cb(value.newValue);
			}
		});
	},
};
