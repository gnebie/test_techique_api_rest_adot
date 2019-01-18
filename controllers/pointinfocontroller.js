"use strict";

let model = require("../models/pointinfomodel");

function isObject(a) {
	return (!!a) && (a.constructor === Object);
};

// vérificaton du type des elements
function check_req_values (body) {
	if (isObject(body) && ("lat" in body) && ("lon" in body) && ("name" in body))
		return true;
	return false;
}

// vérificaton des elements et appel de la fonction de compte
exports.find_elems = function(req, res) {
	let ret = {};
	if (Array.isArray(req.body)) {
		const clean_tab = req.body
			.filter(check_req_values);
		if (clean_tab.length)
			ret = model.get_event(clean_tab);
	} else {
		ret = {name:"Error", val:"JSON array needed"}
	}
	res.send(ret);
};
