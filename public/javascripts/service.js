export const getInformation = (dateStart, dateEnd, keyWord) => {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();

        request.open('GET', 'https://api.ozae.com/gnw/articles?date='+dateStart+'__'+dateEnd+'&key=11116dbf000000000000960d2228e999&query='+keyWord, true)
        request.onload = function() {
            let data = JSON.parse(this.response);

            if (request.status >= 200 && request.status < 400) {
                resolve(data);
            } else {
                reject('error');
            }
        }

        request.send();
      });
}
