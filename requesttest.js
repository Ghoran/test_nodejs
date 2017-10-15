var request = require('request'),
    iconv = require('iconv-lite'),
    fs = require('fs');

//console.log(request());
request.debug = true;
request({ uri: 'http://www.scoreboard.com/ru/match/xfRmPatp', method: 'GET', encoding: 'utf8' },
    function(err, res, body) {
        // Сохраняем результат
        fs.open("debug_match_body.html", "w", 0644, function(err, file_handle) {
            if (!err) {
                fs.writeSync(file_handle, body, null, 'utf8');
            }
        });
    });