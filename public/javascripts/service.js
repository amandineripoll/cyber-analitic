import { Country } from './country.js';

export const getYears = () => ["2019", "2018", "2017", "2016", "2015"];
export const getCountries = () => {
  let tab = [];
  tab.push(new Country("FR", "France", {"edition": "fr-fr","word": "harcèlement" }, []));
  tab.push(new Country("", "New York", {"edition": "en-us-ny","word" : "harassment" }, []));
  tab.push(new Country("", "San Francisco", {"edition": "en-us-df","word" : "harassment" }, []));
  tab.push(new Country("", "Angleterre", {"edition": "en-gb","word": "harassment" }, []));
  tab.push(new Country("", "Belgique FR", {"edition": "fr-be","word": "harcèlement" }, []));
  tab.push(new Country("", "Belgique NL", {"edition": "nl-be","word": "intimidatie" }, []));
  tab.push(new Country("", "Allemagne", {"edition": "de-de","word": "Belästigung" }, []));
  tab.push(new Country("", "Italie", {"edition": "it-it","word": "molestia" }, []));
  return tab;
}

const tabCountries = getCountries();
const tabYears = getYears();

var test;
export const getTest = () => {
    return test;
}

export const getInformations = (year) => {
    return new Promise(function(resolve, reject) {
        var cpt = 0;
        // boucle sur la tabCountries pour faire une recherche d'edition par pays (=country)
        for (let j = 0; j < tabCountries.length; j++) {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.ozae.com/gnw/articles?date='+year+'0101__'+year+'1231&edition='+tabCountries[j].tabTranslation['edition']+'&query='+tabCountries[j].tabTranslation['word']+'&key=646c7b6710c14533be68450f2d61d15d', true)
            request.onload = function() {
                let data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    tabCountries[j].tabArticles = data['articles'];
                    cpt++;
                    if(cpt == tabCountries.length) {
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
