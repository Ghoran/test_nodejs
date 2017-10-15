const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function requestAsync(params) {
    return new Promise((resolve, reject) => {
        request(params, (err, response, body) => {
            if (err) { return reject(err); }
            resolve({ response, body });
            console.log('3');
            console.log('4');
        });
    });
}

function inputURL() {
    return new Promise((resolve, reject) => {
        rl.on('line', (input) => {
            resolve(input);
            console.log(`Received: ${input}`);
        });
    });
}

async function getURL() {
    var url = await inputURL();
    console.log('2');
    var body = await requestAsync({ url });
    //console.log(body.response);
    console.log('5');
    return url;
}

console.log('1');
// http://ya.ru/
getURL();