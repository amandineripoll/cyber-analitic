import { getInformationsStats , getYears } from './service.js';

var tabYears = getYears();
var counts = [];

$(document).ready(function() {
    getInformationsStats().then((data) => {
        console.log(data);
        for(let i = 0; i < tabYears.length; i++)
        {
            var cpt = 0;
            for(let j = 0; j < data.length ; j++){
                if(tabYears[i] === data[j].tabArticles[j].year)
                {
                    cpt += data[j].tabArticles[j]['count'];
                    console.log(cpt);
                }
            }
            counts.push(cpt);
            console.log(counts);
        }
        generateChart();   
    }); 
});

function generateChart(){
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'polarArea',
    
        // The data for our dataset
        data: {
            labels: tabYears,
            datasets: [{
                backgroundColor: 
                ['rgba(93, 173, 226)',
                'rgba(255, 51, 102)',
                'rgba(214, 219, 223)',
                'rgba(247, 220, 111)',
                'rgba(72, 201, 176)',
                'rgba(195, 155, 211)'],
                borderColor: 'white',
                data: counts
            }]
        },
    
        // Configuration options go here
        options: {
            legend: {
                display: true,
                labels: {
                    fontColor: 'black'
                }
            }
        }
    });
}


