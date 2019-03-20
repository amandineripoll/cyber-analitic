import { getInformations } from './service.js';
import { Country } from './country.js';

const retrieveInformations = () => {
    let listing = [];
    getInformations("20181001", "20190101").then((data) => {
        console.log(data);
        data.forEach((element) => {
            listing.push({"name" : element.name, "count" : element.tabArticle['metadata']['count']});
        });
        createRanking(listing, "ASC");
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

retrieveInformations();
