alert('test');

import joursGlissants from "./ressources/manipDate.js";
const apiKey = 'ab322d7874bfae5a3fa44b1ec740809c';
const timezone = document.getElementById('local');
const tempNow = document.getElementById('temp');
const description = document.getElementById('descr');
const iconeMeteo = document.getElementById('icone');
const parHeure = document.querySelectorAll('.bloc-h');
const heureNom = document.querySelectorAll('.heure-prev-nom');
const heureVal = document.querySelectorAll('.heure-prev-val');
const boxes = document.querySelectorAll('.box');
const actuellement = document.getElementById('actu');

let resultatsApi;
let heure = new Date().getHours();
let min = new Date().getMinutes();




//affichage date et heure en cours
actuellement.innerText += ` : ${new Date().toLocaleDateString('fr-FR')} ${heure}h${min}`;

//geolocalisation
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        alert('geolocalisation active');
        apiCall(long,lat);

    })}else{
        alert(`l'application a besoin de la geolocalisation pour fonctionner`);
    }

function apiCall(long,lat){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) =>{

        resultatsApi = data;
        console.log(data);

        //module "en ce moment"
        timezone.innerHTML = resultatsApi.timezone;
        tempNow.innerHTML = Math.round(resultatsApi.current.temp*10)/10 + '°C';
        description.innerText = resultatsApi.current.weather[0].description;

        // temperature par tranche de 3 heures

        //recuperation des heures tous les 3heures
        // heure actuelle
        let heureActuelle = new Date().getHours()

        for (let i=0 ; i<parHeure.length; i++){

            let heurePar3 = heureActuelle + (i+1)*3; //on exclu l'heure actuelle

            if(heurePar3 > 24){
                heureNom[i].innerText = `${heurePar3 - 24} h`;
            }else if(heurePar3==24){
                heureNom[i].innerText = `00 h`;
            }else{
                heureNom[i].innerText = `${heurePar3} h`;
            }
        }

        // recuperation des temperatures

        for(let j=0 ; j<parHeure.length ; j++){
            heureVal[j].innerText = Math.round(resultatsApi.hourly[(j+1)*3].temp*10)/10;
        };
  
        // Gestion de l'icone
        if(heureActuelle >= 6 && heureActuelle < 20){
            iconeMeteo.src = `img/icones/day/${resultatsApi.current.weather[0].icon}.svg`
            
        }else{
            iconeMeteo.src = `img/icones/night/${resultatsApi.current.weather[0].icon}.svg`
            
            modeNuit();    
        }
    });
}
// fonction affichage de nuit
function modeNuit(){
    document.body.style.background= `url('img/night.jpg') center/cover`;
    
    heureVal.forEach(item =>{
        item.style.color = '#0A0572';
    });

    boxes.forEach(item => {
        item.style.background = 'rgb(120,120,120)';
    })
}

