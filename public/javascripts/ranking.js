import { getInformation } from './service.js';

$(document).ready(function(){
    let information = getInformation("20180601", "20180630", "attentat");

    information.then(function(value) {
        console.log(value);
    });
});
