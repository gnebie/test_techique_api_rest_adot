"use strict";

const pointinfo = require("../controllers/pointinfocontroller");

module.exports = function(app) {
	// pointinfo Route
	app.route("/pointinfo")
		.post(pointinfo.find_elems);
};
