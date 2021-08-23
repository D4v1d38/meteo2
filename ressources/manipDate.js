// realisation d'un tableau des jours glissant sur 7 jours

const week = ['lundi', 'mardi','mercredi', 'jeudi','vendredi','samedi','dimanche'];
const options = {weekday : 'long'};
let today = new Date().toLocaleDateString('fr-FR', options);

//on coupe le tableau a partir du jour en cours jusqu'a la fin
const tab = week.slice(week.indexOf(today));
//on coupe le tableau du debut jusqu'au jour en cours
const tab2 = week.slice(0,week.indexOf(today));
//on rassemble les deux pour faire un tableau avec les jours glissants
let joursGlissants = tab.concat(tab2);

export default joursGlissants;
