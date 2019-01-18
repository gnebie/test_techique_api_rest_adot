const csv = require("csvtojson");

const roundsize = 1;

// fonction de récupération du fichier csv et de transformation en json
const getevenJson = async ()=>{
	const even = await csv({/* noheader:true, output: "csv" */}).fromFile("./datas/events.csv");
	return even;
};
let evenJson = [];

// récuperation du tableau une seule fois dans une variable globale pour ne pas avoir le load le tableau a chaque appel
getevenJson().then((even) => {
	evenJson = even;
});

// fonction permetant de faire un arrondi en js a size décimale près
function round(elem, size) {
	return (Math.round(Math.pow(10, size) * elem) / Math.pow(10, size));
}
// fonction permetant de faire un arrondi inferieur en js a size décimale près
function floor(elem, size) {
	return (Math.floor(Math.pow(10, size) * elem) / Math.pow(10, size));
}
// fonction permetant de faire un arrondi supperieur en js a size décimale près
function ceil(elem, size) {
	return (Math.ceil(Math.pow(10, size) * elem) / Math.pow(10, size));
}

// compte le nombre de fois qu'une impression publicitaire ou un clics a été fait à un point d'intéret donné
// test avec un point d'intéret arrondi ou bien avec un range en carre ou en cercle
exports.get_event =  (lat, lon, ecart_imp, ecart_cli) => {
	let impression = 0;
	let click = 0;
	evenJson.forEach(function(elem) {
		if (elem.event_type == "imp") {
			// if (round(elem.lat, roundsize) == round(lat, roundsize) && round(elem.lon, roundsize) == round(lon, roundsize)) {
			// if (elem.lat > lat - ecart_imp && elem.lat < lat + ecart_imp && elem.lon < lon + ecart_imp && elem.lon > lon - ecart_imp) {
			if ((elem.lat - lat)**2 + (elem.lon - lon)**2 < ecart_imp**2) {
				impression += 1;
			}
		} else if (elem.event_type == "click") {
			// if (round(elem.lat, roundsize) == round(lat, roundsize) && round(elem.lon, roundsize) == round(lon, roundsize)) {
			// if (elem.lat > lat - ecart_cli && elem.lat < lat + ecart_cli && elem.lon < lon + ecart_cli && elem.lon > lon - ecart_cli) {
			if ((elem.lat - lat)**2 + (elem.lon - lon)**2 < ecart_cli**2) {
				click += 1;
			}
		}
	});
	return ({impression, click});
};
