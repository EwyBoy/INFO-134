// Sources: https://stackoverflow.com/questions/12460378/how-to-get-json-from-url-in-javascript

const befolkningURL  = 'http://wildboy.uib.no/~tpe056/folk/104857.json';
const sysselsatteURL = 'http://wildboy.uib.no/~tpe056/folk/100145.json';
const utdanningURL   = 'http://wildboy.uib.no/~tpe056/folk/104857.json';

const jsonURLs = [befolkningURL, sysselsatteURL, utdanningURL];

/**
*   Requests a JSON file from a ID
*   @param jsonID - [Integer] ID between 0 - jsonURLs.lenght
*/
let getJSONByID = function(jsonID) {
    if (jsonID < jsonURLs.length && jsonID >= 0) {
        return getJSON(jsonURLs[jsonID]);
    } else {
        return console.error("Error: JSON-ID out of bounds with ID: " + jsonID);
    }
};

/**
*   Requests a JSON file from a string name
*   @param jsonName - [String] Name
*/
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

/**
*   Requests a JSON file from a url
*   @param url - [String] an absolute URL giving the base location of the JSON file
*   @param response - [String] an absolute URL giving the base location of the JSON file
*/
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

/**
 *   Requests a JSON file from a url
 *   @param url - [String] an absolute URL giving the base location of the JSON file
 */
let getJSON = function(url) {
    return requestJSON(url, function(err, data) {
        if (err !== null) {
            console.error('Error: Something went wrong: ' + err);
        } else {
            console.info('Info: DataObject: ' + data);
        }
    });
};


