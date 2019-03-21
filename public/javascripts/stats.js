var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'polarArea',

    // The data for our dataset
    data: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019'],
        datasets: [{
            backgroundColor: 
            ['rgba(93, 173, 226)',
            'rgba(255, 51, 102)',
            'rgba(214, 219, 223)',
            'rgba(247, 220, 111)',
            'rgba(72, 201, 176)',
            'rgba(195, 155, 211)'],
            borderColor: 'white',
            data: [25, 10, 5, 14, 20, 15]
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

