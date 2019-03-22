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
    for (let i = 0; i < data.articles.length; i++) {
        $('#news .news-card-'+i).html("<div class='img'><img src='"+data.articles[i]['img_uri']+"' alt='article' width='100%'/></div><p class='nbr-like'>"+data.articles[i]['social_score']+" <i class='fas fa-heart'></i></p><p class='title'>"+data.articles[i]['name']+"</p><div class='link-more'><a class='btn btn-link' href='"+data.articles[i]['url']+"' target='_blank'>En savoir plus</a></div>");
    }
}

let today = new Date();
today.setDate(today.getDate() - 1);

let dateToday = today.getFullYear() + "" + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);

retrieveInformationArticlesLiked(dateToday, dateToday, "4");
