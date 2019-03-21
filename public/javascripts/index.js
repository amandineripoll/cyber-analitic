import { getInformationsArticles } from './service.js';

/*
* Récupération des articles
*/

const retrieveInformationArticlesLiked = (dateStart, dateEnd, limit) => {
    let information = getInformationsArticles(dateStart, dateEnd, (limit-1));

    information.then(function(value) {
        createArticles(value);
    });
}

const createArticles = (data) => {
    console.log(data)
}

let today = new Date();
let dateToday = today.getFullYear() + "" + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);

retrieveInformationArticlesLiked(dateToday, dateToday, "4");
