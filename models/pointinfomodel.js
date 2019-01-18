const csv = require("csvtojson");

// fonction de récupération du fichier csv et de transformation en json
const getevenJson = async () => {
	const even = await csv({/* noheader:true, output: "csv" */}).fromFile("./datas/events.csv");
	return even;
};

let evenJson = [];
// récuperation du tableau une seule fois dans une variable globale pour ne pas avoir le load le tableau a chaque appel
getevenJson().then((even) => {
	evenJson = even;
});

// transforme le tableau en objet
function format_return(point_tab) {
	let ret = {};
	point_tab.map(function (elem) {
		return {"lat":elem.lat, "lon":elem.lon, "name":elem.name, "impression":elem.impression, "click":elem.click};
	}).forEach(function (point) {
		ret[point.name] = point;
	});
	return (ret);
}

// check les distances entre les differents elements
exports.get_event = (point_tab) => {

	// ajout des elements absents de l'objet
	point_tab.forEach(function (point) {
		point.impression = 0;
		point.click = 0;
	});
	// calcule de la distance par point
	evenJson.forEach(function(elem) {
		// distance enclidienne : racine( (xa-ya)2 + (xb-yb)2 ).
		// comparer les puissances perment d'éviter de faire une opperation de racine carré très couteuse en temps processeur
		point_tab.forEach((point) => {
			point.distance = ((point.lat - elem.lat)**2 + (point.lon - elem.lon)**2);
		});
		point_tab.sort(function(p1, p2) {
			return (p1.distance - p2.distance);
		});
		if (elem.event_type == "imp")
			point_tab[0].impression += 1;
		else if (elem.event_type == "click")
			point_tab[0].click += 1;
	});
	const return_formated_object = format_return(point_tab);
	return return_formated_object;
};
