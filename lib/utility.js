"use strict";

const Dom = require("./dom");

module.exports = {

	// ADD CLASS WHEN CONDITIONAL IS FALSE
	addWhenFalse(obj) {


		// CONVERT TO AN ARRAY IF NOT
		if (!Array.isArray(obj.el)) {
			obj.el = [ obj.el ];
		}

		return obj.el.forEach(function(element) {

			const el = Dom.queryAll(element); //FIND ELEMENT IN DOM

			if (!obj.bool) {
				return Dom.addClass(el, obj.className); // ADD CLASS
			} else {
				return Dom.removeClass(el, obj.className);
			}
		});
	}, // REMOVE CLASS


	// ADD CLASS WHEN CONDITIONAL IS TRUE
	addWhenTrue(obj) {


		// CONVERT TO AN ARRAY IF NOT
		if (!Array.isArray(obj.el)) {
			obj.el = [ obj.el ];
		}

		return obj.el.forEach(function(element) {

			const el = Dom.queryAll(element); //FIND ELEMENT IN DOM

			if (obj.bool) {
				return Dom.addClass(el, obj.className); // ADD CLASS
			} else {
				return Dom.removeClass(el, obj.className);
			}
		});
	}, // REMOVE CLASS


	applySetting(obj) {


		// APPLY A NEW SETTING
		atom.config.set(obj.config, obj.val);

		return this[obj.action]({
			el: obj.el,
			className: obj.className,
			bool: obj.val
		},

			atom.config.onDidChange(obj.config, function(value) {
				if ((value.oldValue !== value.newValue) && (typeof obj.cb === "function")) {
					return obj.cb(value.newValue);
				}
			})
		);
	}
};
