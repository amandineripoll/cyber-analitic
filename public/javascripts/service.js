export const getInformation = (dateStart, dateEnd, tabCountry) => {
    return new Promise(function(resolve, reject) {
        var cpt = 0;
        for (let i = 0; i < tabCountry.length; i++) {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.ozae.com/gnw/articles?date='+dateStart+'__'+dateEnd+'&key=646c7b6710c14533be68450f2d61d15d&edition='+tabCountry[i].tabTranslation['edition']+'&query='+tabCountry[i].tabTranslation['word'], true)
            request.onload = function() { 
                let data = JSON.parse(this.response);
                if (request.status >= 200 && request.status < 400) {
                    tabCountry[i].tabArticle= data;
                    cpt++;
                    if(cpt == tabCountry.length) {
                        resolve(tabCountry);
                    }
                } else {
                    reject('error');
                }
            }
            request.send();
        }
      });
}
