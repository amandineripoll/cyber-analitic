import { Country } from './country.js';

let tabCountries = [];
tabCountries.push(new Country("France", [], {"edition": "fr-fr","word": "harcèlement" }));
tabCountries.push(new Country("New York", [], {"edition": "en-us-ny","word" : "harassment" }));
tabCountries.push(new Country("San Francisco", [], {"edition": "en-us-df","word" : "harassment" }));
tabCountries.push(new Country("England", [], {"edition": "en-gb","word": "harassment" }));
tabCountries.push(new Country("Belgium FR", [], {"edition": "fr-be","word": "harcèlement" }));
tabCountries.push(new Country("Belgium NL", [], {"edition": "nl-be","word": "intimidatie" }));
tabCountries.push(new Country("German", [], {"edition": "de-de","word": "Belästigung" }));
tabCountries.push(new Country("Italia", [], {"edition": "it-it","word": "molestia" }));

export const getInformations = (dateStart, dateEnd) => {
    return new Promise(function(resolve, reject) {
        var cpt = 0;
        for (let i = 0; i < tabCountries.length; i++) {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.ozae.com/gnw/articles?date='+dateStart+'__'+dateEnd+'&edition='+tabCountries[i].tabTranslation['edition']+'&query='+tabCountries[i].tabTranslation['word']+'&key=646c7b6710c14533be68450f2d61d15d', true)
            request.onload = function() {
                let data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    tabCountries[i].tabArticle = data;
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

export const getInformationsArticles = (dateStart, dateEnd, limit) => {
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