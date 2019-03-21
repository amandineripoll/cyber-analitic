import { getInformations } from './service.js';
import { getInformationsArticles } from './service.js';

const tabCountries = getCountries();

const retrieveInformations = (year, order) => {
    let listing = [];
    getInformations(year).then((data) => {
        data.forEach(element => {
            listing.push({ "name": element.name, "count": element.tabArticles.length });
        });
        createRanking(dateStart, dateEnd, listing, order);
    });
}

const retrieveInformationsArticlesLiked = (dateStart, dateEnd, limit) => {
    let information = getInformationsArticles(dateStart, dateEnd, (limit-1));

    information.then(function(value) {
        createArticles(dateStart, dateEnd, value);
    });
}

const createRanking = (dateStart, dateEnd, listing, type) => {
    listing.sort(function (a, b) {
        return (type === "ASC" ? b.count - a.count : a.count - b.count);
    });

    let dateStartClean = dateStart.substring(6, 8) + "/" + dateStart.substring(4, 6) +"/" + dateStart.substring(0, 4);
    let dateEndClean = dateEnd.substring(6, 8) + "/" + dateEnd.substring(4, 6) +"/" + dateEnd.substring(0, 4);
    $('#date').html("du " + dateStartClean + " au " + dateEndClean);

    let tabPosition = ["first-place", "second-place", "third-place", "fourth-place", "fifth-place"];
    let other = false;
    listing.forEach(function (value, i) {
        if(i < tabPosition.length) {
            $('#ranking > .'+tabPosition[i]+' > .name > p').html(value.name);
            $('#ranking > .'+tabPosition[i]+' > .count > p').html(value.count);
        } else {
            other = true;
            $('#other-place').append("<div class='row "+(i+1)+"-place other-place podium'>"+$('.fifth-place').html()+"</div>")
            $('#other-place > .'+(i+1)+'-place > .position > p').html("#"+(i+1));
            $('#other-place > .'+(i+1)+'-place > .name > p').html(value.name);
            $('#other-place > .'+(i+1)+'-place > .count > p').html(value.count);
        }
        if(other) {
            $('#more').fadeIn();
        }
    });
}

const resetRanking = () => {
    $('#ranking.container .name p').html('_');
    $('#ranking.container .count p').html('_');
    $('#date').html("");
    $('#more').hide();
    $('#less').hide();
    $('#other-place').hide();
    $('#other-place').html("");
}

const createArticles = (dateStart, dateEnd, data) => {
    let dateStartClean = dateStart.substring(6, 8) + "/" + dateStart.substring(4, 6) +"/" + dateStart.substring(0, 4);
    let dateEndClean = dateEnd.substring(6, 8) + "/" + dateEnd.substring(4, 6) +"/" + dateEnd.substring(0, 4);
    $('#date-articles').html("du " + dateStartClean + " au " + dateEndClean);

    for (let i = 0; i < data.articles.length; i++) {
        $('#articles').append("<div class='col-sm-12'><div class='card-article'><img src='"+data.articles[i]['img_uri']+"' alt='article' width='100%'/><p class='nbr-like'>"+data.articles[i]['social_score']+" <i class='fas fa-heart'></i></p><p class='title'>"+data.articles[i]['name']+"</p><div class='link-more'><a class='btn btn-link' href='"+data.articles[i]['url']+"' target='_blank'>En savoir plus</a></div></div></div>");
    }
}

/*
* Création du classement
*/
retrieveInformations("20190201", "20190301", "ASC");

/*
* Création du classement
*/
retrieveInformationsArticlesLiked("20180101", "20190101", "2");

/*
* Fonction evenement
*/
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

$( "#submit-interval-date-articles" ).click(function() {
    let dateStart = $('#date-start-article').val().split("-").join("");
    let dateEnd = $('#date-end-article').val().split("-").join("");

    if(dateStart != "" && dateEnd != "") {
        $('#date-articles').html('');
        $('#articles').html('');
        retrieveInformationsArticlesLiked(dateStart, dateEnd, "2");
    } else {
        console.log('need date start and date end')
    }
});

$('#more').click(function() {
    $(this).hide();
    $("#other-place").fadeIn();
    $("#less").fadeIn();
});

$('#less').click(function() {
    $(this).hide();
    $("#other-place").hide();
    $("#more").fadeIn();
});

$('#reset').click(function() {
    //reset le filtre
    $('#date-start').val("");
    $('#date-end').val("");
    jQuery(".order input:eq(0)").prop( "checked", true );
    //reset le classement
    resetRanking();
    retrieveInformations("20190201", "20190301", "ASC");
});

$('#reset-articles').click(function() {
    //reset le filtre
    $('#date-start-article').val("");
    $('#date-end-article').val("");
    //reset les articles
    $('#date-articles').html('');
    $('#articles').html('');
    retrieveInformationsArticlesLiked("20180101", "20190101", "2");
});
