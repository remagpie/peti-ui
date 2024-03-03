"use strict";

module.exports = {
	query(el) {
		return document.querySelector(el);
	},

	queryAll(el) {
		return document.querySelectorAll(el);
	},

	addClass(el, className) {
		return this.toggleClass("add", el, className);
	},

	removeClass(el, className) {
		return this.toggleClass("remove", el, className);
	},

	toggleClass(action, el, className) {
		if (el !== null) {
			let i = 0;
			return (() => {
				const result = [];
				while (i < el.length) {
					el[i].classList[action](className);
					result.push(i++);
				}
				return result;
			})();
		}
	}
};
