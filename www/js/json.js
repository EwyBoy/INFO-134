// Sources: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript

const befolkningURL = 'http://wildboy.uib.no/~tpe056/folk/104857.json';
const sysselsatteURL = 'http://wildboy.uib.no/~tpe056/folk/100145.json';
const utdanningURL = 'http://wildboy.uib.no/~tpe056/folk/104857.json';

const jsonURLs = [befolkningURL, sysselsatteURL, utdanningURL];

/*
*
*/
let getJSONByID = function(jsonID) {
    if (jsonID < jsonURLs.length && jsonID >= 0) {
        return getJSON(jsonURLs[jsonID]);
    } else {
        return console.error("Error: JSON-ID out of bounds with ID: " + jsonID);
    }
};

let getJSONByName = function(jsonName) {
    jsonName = jsonName.toLowerCase();
    if (jsonName === "befolkning") {
        return getJSON(befolkningURL);
    } else if (jsonName === "sysselsatte") {
        return getJSON(sysselsatteURL);
    } else if (jsonName === "utdanning") {
        return getJSON(utdanningURL);
    } else {
        return console.error("Error: No JSON found with the name: " + jsonName)
    }
};


let requestJSON = function (url, response) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'json';

    request.onload = function () {
        const status = request.status;
        if (200 === status && request.readyState === 4) {
            response(null, request.response);
        } else {
            response(status, request.response);
        }
    };
    request.send();
};

let getJSON = function(url) {
    return requestJSON(url, function(err, data) {
        if (err !== null) {
            console.error('Error: Something went wrong: ' + err);
        } else {
            console.info('Info: Your query count: ' + data.query.count);
        }
    });
};


