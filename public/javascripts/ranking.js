import { getInformation } from './service.js';
import { Country } from './country.js';

let tabCountry = [];

tabCountry.push(new Country("France", [], {"edition": "fr-fr","word": "harcèlement" }));
tabCountry.push(new Country("New York", [], {"edition": "en-us-ny","word" : "harassment" }));
tabCountry.push(new Country("San Francisco", [], {"edition": "en-us-df","word" : "harassment" }));
tabCountry.push(new Country("England", [], {"edition": "en-gb","word": "harassment" }));
tabCountry.push(new Country("Belgium FR", [], {"edition": "fr-be","word": "harcèlement" }));
tabCountry.push(new Country("Belgium NL", [], {"edition": "nl-be","word": "intimidatie" }));
tabCountry.push(new Country("German", [], {"edition": "de-de","word": "Belästigung" }));
tabCountry.push(new Country("Italia", [], {"edition": "it-it","word": "molestia" }));

let information = getInformation("20170101", "20190101", tabCountry);

information.then(function(value) {
    console.log(value);
});
