var request = require('request');

var baseURL = 'http://api.fixer.io/latest';

function getRates(callback, from_code, to_code) {
    console.log("in getRates");
    var queryParam = {};
    var queryParam = {"base": from_code};

    console.log("to_code:");
    console.log(to_code);

    request({ uri: baseURL, qs: queryParam }, function (error, response, body) {
        //console.log(error);
        console.log("in request")
        if (!error && response.statusCode === 200) {
            console.log(response.statusCode);
            console.log(JSON.parse(body).base);
            console.log(JSON.parse(body).date);
            console.log(JSON.parse(body).rates);
            var rates = JSON.parse(body).rates;
            console.log(to_code);
            console.log(rates[to_code]);
            callback(null, rates[to_code])
        }
    });



}
module.exports = getRates;