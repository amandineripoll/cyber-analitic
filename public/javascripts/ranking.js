import { getInformations, getCountries } from './service.js';
import { Country } from './country.js';

const tabCountries = getCountries();

const retrieveInformations = (order) => {
    let listing = [];
    getInformations().then((data) => {
        data.forEach(element => {
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

retrieveInformations("20181001", "20190101", "ASC");

$( "#submit-interval-date" ).click(function() {
    let dateStart = $('#date-start').val().split("-").join("");
    let dateEnd = $('#date-end').val().split("-").join("");

    let checked = ($('#desc').is(':checked') ? "DESC" : "ASC");

    if(dateStart != "" && dateEnd != "" && checked != "") {
        resetRanking();
        retrieveInformations(dateStart, dateEnd, checked);
    } else {
        console.log('need date start and date end')
    }
});
