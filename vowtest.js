const vow = require('vow');

function readFile(filename, encoding) {
    var promise = vow.promise();
    fs.readFile(filename, encoding, function(err, data) {
        if (err) return promise.reject(err);
        promise.fulfill(data);
    });
    return promise;
}

vow.all([readFile('test1.txt', 'utf8'), readFile('test2.txt', 'utf8')]).then(function(results) {
    console.log(results.join('\n'));
});