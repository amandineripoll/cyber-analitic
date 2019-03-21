import { getInformations, getCountries, getYears } from './service.js';
import { Country } from './country.js';

var polygonSeries;
var tabCountries = [];
var tabYears = getYears();

var filterForm = document.getElementById('filterForm');
var selectYears = document.getElementById('years');
var selectCountries = document.getElementById('countries');
var btnSubmit = document.getElementById('btnSubmit');

$(document).ready(function() {
    initializationMap();
});

btnSubmit.onclick = () => {
    getInformations(selectYears.value).then((data) => {
        tabCountries = data;
        colorMap();
    });
}

const colorMap = () => {
    var min = tabCountries[0].tabArticles.length;
    var max = 0;
    for(let i = 0; i < tabCountries.length; i++) {
      if(min > tabCountries[i].tabArticles.length && tabCountries[i].tabArticles.length != 0) {
        min = tabCountries[i].tabArticles.length;
      }
      if(max < tabCountries[i].tabArticles.length) {
        max = tabCountries[i].tabArticles.length;
      }
    }
    var medMin = (max - min) / 4;
    var med = (max - min) / 2;
    var medMax = ((max - min) / 4) * 3;

    polygonSeries.data = polygonSeries.data.map(item => {
        const country = tabCountries.find(country => country.id === item.id);
        if(country) {
          const size = country.tabArticles.length;
          var level = 0;
          if(size <= max && size > medMax) { level = 1; } // level max
          else if(size <= medMax && size > medMin) { level = 2; } // level med
          else if(size <= medMin && size > min) { level = 3; } // level min
          item.level = level;
        }
        return item;
    });
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
    polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
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

    // color according to level
    polygonTemplate.adapter.add("fill", function(fill, target) {
        // color level max
        if (target.dataItem.dataContext && target.dataItem.dataContext.level == 1) {
            return am4core.color("#FF4633");
        }
        // color level med
        else if (target.dataItem.dataContext && target.dataItem.dataContext.level == 2) {
            return am4core.color("#FFB233");
        }
        // color level min
        else if (target.dataItem.dataContext && target.dataItem.dataContext.level == 3) {
            return am4core.color("#000");
        }
        return fill;
    });
}
