"use strict";

let ecart_imp = 0;
let ecart_cli = 0;
let incrementeur = 0;
let ecart_imp_start_val = 0.07500534057617189;
let ecart_cli_start_val = 0.07418212890625;
let incrementeur_start_val = 0.05;
let incrementeur_min_val = 0.0000001;
const FIND_FOM_DATA = 1;
const option = 0;

let model = require("../models/pointinfomodel");

function isObject(a) {
	return (!!a) && (a.constructor === Object);
};

/* fonction recursive permetant de relancer le check des valeurs
en modifiant le range des point d'intérets par rapport aux données trouvées
en prenant comme valeurs de référence les valeurs donnees en exemple du test
fonction utilisée uniquement en mode test pour trouver le range
*/
function find_right_range_value_from_datas(newbody)
{
	let imp_target;
	let cli_target;

	if (newbody.name == "Chatelet") {
		imp_target = 136407;
		cli_target = 16350;
	} else if (newbody.name == "Arc de triomphe") {
		imp_target = 63593;
		cli_target = 7646;
	} else {
		imp_target = 63593;
		cli_target = 7646;
	}
	if (newbody.impression == imp_target && newbody.click == cli_target) {
		console.log("match found ! size imp : " + ecart_imp + " size cli : " + ecart_cli + " !");
		console.log(newbody);
		return ;
	}
	if (newbody.impression > imp_target) {
		console.log(" imp value too big ! result : " + ecart_imp + " !");
		ecart_imp -= incrementeur;
	} else if (newbody.impression < imp_target) {
		console.log(" imp value too small ! result : " + ecart_imp + " !");
		ecart_imp += incrementeur;
	}
	if (newbody.click > cli_target) {
		console.log(" click value too big ! result : " + ecart_cli + " !");
		ecart_cli -= incrementeur;
	} else if (newbody.click < cli_target) {
		console.log(" click value too small ! result : " + ecart_cli + " !");
		ecart_cli += incrementeur;
	}
	incrementeur /= 2;
	if (incrementeur > incrementeur_min_val) {
		check_req_values({"lat":newbody.lat, "lon":newbody.lon, "name":newbody.name});
	}
}

// vérificaton des elements et appel de la fonction de compte
function check_req_values (body) {

	if (!isObject(body) || !("lat" in body) || !("lon" in body) || !("name" in body) )
		return ({name:"Error", val:"Parsing error"});

	const {impression, click} = model.get_event(body.lat, body.lon, ecart_imp, ecart_cli);
	const newbody = {"lat":body.lat, "lon":body.lon, name:body.name, impression, click};

	if (option == FIND_FOM_DATA) {
		find_right_range_value_from_datas(newbody);
	}
	return ({name:body.name, val:newbody});
}

exports.find_elems = function(req, res) {
	let ret = {};
	if (Array.isArray(req.body)) {
		req.body.forEach(function (elem) {
			ecart_imp = ecart_imp_start_val;
			ecart_cli = ecart_cli_start_val;
			incrementeur = incrementeur_start_val;
			const {name, val} = check_req_values(elem);
			ret[name] = (val);
		});
	} else {
		ret = {name:"Error", val:"JSON array needed"}
	}
	res.send(ret);
};
