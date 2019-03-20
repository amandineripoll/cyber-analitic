import { getInformations } from './service.js';
import { Country } from './country.js';

const getCountry = () => {
    let tabCountry = [];

    tabCountry.push(new Country("France", [], {"edition": "fr-fr","word": "harcèlement" }));
    tabCountry.push(new Country("New York", [], {"edition": "en-us-ny","word" : "harassment" }));
    tabCountry.push(new Country("San Francisco", [], {"edition": "en-us-df","word" : "harassment" }));
    tabCountry.push(new Country("England", [], {"edition": "en-gb","word": "harassment" }));
    tabCountry.push(new Country("Belgium FR", [], {"edition": "fr-be","word": "harcèlement" }));
    tabCountry.push(new Country("Belgium NL", [], {"edition": "nl-be","word": "intimidatie" }));
    tabCountry.push(new Country("German", [], {"edition": "de-de","word": "Belästigung" }));
    tabCountry.push(new Country("Italia", [], {"edition": "it-it","word": "molestia" }));

    return tabCountry;
}

const retrieveInformation = (dateStart, dateEnd, arrayCountry, order) => {
    let listing = [];
    let information = getInformations(dateStart, dateEnd, arrayCountry);

    information.then(function(value) {
        value.forEach(element => {
            listing.push({"name" : element.name, "count" : element.tabArticle['metadata']['count']});
        });
        createRanking(listing, order);
    });
}

const createRanking = (listing, type) => {
    listing.sort(function (a, b) {
        return (type === "ASC" ? b.count - a.count : a.count - b.count);
    });

    let tabPosition = ["first-place", "second-place", "third-place", "fourth-place"];
    listing.forEach(function (value, i) {
        if(i < 4) {
            $('#ranking > .'+tabPosition[i]+' > .name > p').html(value.name);
            $('#ranking > .'+tabPosition[i]+' > .count > p').html(value.count);
        } else {
            console.log("faire un 'charger plus' sur le classement");
        }
    });
}

const resetRanking = () => {
    $('#ranking.container .name p').html('_');
    $('#ranking.container .count p').html('_');
}

retrieveInformation("20181001", "20190101", getCountry(), "ASC");

$( "#submit-interval-date" ).click(function() {
    let dateStart = $('#date-start').val().split("-").join("");
    let dateEnd = $('#date-end').val().split("-").join("");

    let checked = ($('#desc').is(':checked') ? "DESC" : "ASC");

    if(dateStart != "" && dateEnd != "" && checked != "") {
        resetRanking();
        retrieveInformation(dateStart, dateEnd, getCountry(), checked);
    } else {
        console.log('need date start and date end')
    }
});
