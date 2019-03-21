import { Country } from './country.js';

export const getYears = () => ["2019", "2018", "2017", "2016", "2015"];
export const getCountries = () => {
    let tab = [];
    tab.push(new Country("FR", "France", {"edition": "fr-fr","word": "harcèlement" }, []));
    tab.push(new Country("US", "New York", {"edition": "en-us-ny","word" : "harassment" }, []));
    tab.push(new Country("US", "San Francisco", {"edition": "en-us-df","word" : "harassment" }, []));
    tab.push(new Country("GB", "United Kingdom", {"edition": "en-gb","word": "harassment" }, []));
    tab.push(new Country("BE", "Belgium FR", {"edition": "fr-be","word": "harcèlement" }, []));
    tab.push(new Country("BE", "Belgium NL", {"edition": "nl-be","word": "intimidatie" }, []));
    tab.push(new Country("DE", "Germany", {"edition": "de-de","word": "Belästigung" }, []));
    tab.push(new Country("IT", "Italy", {"edition": "it-it","word": "molestia" }, []));
    return tab;
}

const tabCountries = getCountries();
const tabYears = getYears();

export const getInformationsYear = (year) => {
    return new Promise(function(resolve, reject) {
        var cpt = 0;
        // boucle sur la tabCountries pour faire une recherche d'edition par pays (=country)
        for (let j = 0; j < tabCountries.length; j++) {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.ozae.com/gnw/articles?date='+year+'0101__'+year+'1231&edition='+tabCountries[j].tabTranslation['edition']+'&query='+tabCountries[j].tabTranslation['word']+'&key=646c7b6710c14533be68450f2d61d15d', true)
            request.onload = function() {
                let data = JSON.parse(this.response);
                console.log(data);
                if (request.status >= 200 && request.status < 400) {
                    tabCountries[j].tabArticles = data['articles'];
                    cpt++;
                    if(cpt == tabCountries.length) {
                        console.log("chargement terminé");
                        resolve(tabCountries);
                    }
                } else {
                    reject('error');
                }
            }
            request.send();
        }
    });
}

export const getInformationsPeriod = (dateStart, dateEnd, limit) => {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', 'https://api.ozae.com/gnw/articles?date='+dateStart+'__'+dateEnd+'&edition=fr-fr&query=harcèlement&order[col]=social_score&order[srt]=DESC&hard_limit='+limit+'&key=646c7b6710c14533be68450f2d61d15d', true)
        request.onload = function() {
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                resolve(data);
            } else {
                reject('error');
            }
        }
        request.send();
      });
}
