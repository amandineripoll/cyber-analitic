import { getInformations, getCountries, getYears } from './service.js';
import { Country } from './country.js';

var tabCountries = [];
var currentTab = [];
var tabYears = getYears();
var year = "2018";
/*const year = $(document).getElementById['years'].value;
const country = $(document).getElementById['countries'].value;*/

$(document).ready(function() {
    initializationMap();
    getInformations().then((data) => {
        tabCountries = data;
        colorMap();
    });
});

function colorMap() {
  console.log("fin");
  console.log(tabCountries);
  console.log(currentTab);

  var min = currentTab[0].tabArticle[0]['articles'].length;
  var max = 0;
  for(let i = 0; i < currentTab.length; i++) {
    var nbArticles = 0;
    for(let j = 0; j < currentTab[i].tabArticle.length; j++) {
      nbArticles += currentTab[i].tabArticle[j]['articles'].length;
    }
    if(min > nbArticles) {
      min = nbArticles;
    }
    if(max < nbArticles) {
      max = nbArticles;
    }
  }
  var med = (max - min) / 2;

  /*polygonSeries.data = [{
        "id": "US",
        "level": 1
      }, {
        "id": "BR",
        "level": 1
      }, {
        "id": "AU",
        "level": 2
      }, {
        "id": "CN",
        "level": 1
      }, {
        "id": "FR",
        "level": 2
      }]

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#004494");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#0682ff");

    polygonTemplate.adapter.add("fill", function(fill, target) {
        if (target.dataItem.dataContext && target.dataItem.dataContext.level == 1) {
            return am4core.color("#FF4633");
        }
        return fill;
      });

    polygonTemplate.adapter.add("fill", function(fill, target) {
        if (target.dataItem.dataContext && target.dataItem.dataContext.level == 2) {
            return am4core.color("#FFB233");
        }
        return fill;
    });*/
}

const initializationMap = () => {

    // Themes begin
    am4core.useTheme(am4themes_animated);

    // Create map instance
    var chart = am4core.create("map", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.mapPolygons.template.strokeWidth = 0.5;

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    polygonSeries.data = [{
        "id": "US",
        "level": 1
      }, {
        "id": "BR",
        "level": 1
      }, {
        "id": "AU",
        "level": 2
      }, {
        "id": "CN",
        "level": 1
      }, {
        "id": "FR",
        "level": 2
      },{
        "id": "FR",
        "level": 2
      }]

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#004494");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#0682ff");
    
    polygonTemplate.adapter.add("fill", function(fill, target) {
        if (target.dataItem.dataContext && target.dataItem.dataContext.level == 1) {
            return am4core.color("#FF4633");
        }
        return fill;
      });
      
    polygonTemplate.adapter.add("fill", function(fill, target) {
    if (target.dataItem.dataContext && target.dataItem.dataContext.level == 2) {
        return am4core.color("#FFB233");
    }
    return fill;
    });



      
    // Create active state
    // var activeState = polygonTemplate.states.create("active");
    // activeState.properties.fill = chart.colors.getIndex(4);

    // Create an event to toggle "active" state
    // polygonTemplate.events.on("hit", function(ev) {
    //     ev.target.isActive = !ev.target.isActive;
    // })
}
