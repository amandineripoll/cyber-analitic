console.log('accueil');

//Initialisation de la carte
function initializationMap(){
    var mymap = L.map("map").setView([48.866667, 2.333333], 12);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        attribution: '',
        id: 'mapbox.streets'
    }).addTo(mymap);

    return mymap;
}

$(document).ready(function(){
    console.log('document is ready');

    initializationMap();
});
