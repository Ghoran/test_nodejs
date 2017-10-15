var http = require('http'),
    request = require('request'),
    cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    fs = require('fs'),
    vow = require('vow');

var get_table = [],
    full_table = [];

var crawlData = (function() {
    request.post({ url: '/Account/Login?returnurl=%2Fquestions', form: { Email: 'maslov_ay@directum.ru' } }, function(err, httpResponse, body) {
        fs.open("auth_body.html", "w", 0644, function(err, file_handle) {
            if (!err) {
                fs.writeSync(file_handle, body, null, 'utf8');
            }
        });
    })

    var getUrlTables = function(i, url) {
        request({ uri: url, method: 'GET', encoding: 'utf8' },
            function(err, res, body) {
                // Сохраняем результат
                fs.open("debug_body.html", "w", 0644, function(err, file_handle) {
                    if (!err) {
                        fs.writeSync(file_handle, body, null, 'utf8');
                    }
                });

                // Получили текст страницы, теперь исправляем кодировку и разбираем DOM с помощью Cheerio.
                var $ = cheerio.load(
                    iconv.encode(
                        iconv.decode(new Buffer(body, 'binary'), 'win1251'), 'utf8')
                );
                table = '';

                // Cheerio даёт возможность навигации по DOM с помощью стандартных CSS-селекторов.
                $('.docCard_title').each(function() {
                    table += '<tr>' + this.html() + '</tr>';
                });

                // Работа с таблицей, удаление ненужных строк и прочего
                table = table.split('</td></tr><tr><td>');
                table.splice(0, 1);
                table = table.join('</td></tr><tr><td>');
                // Складываем результат в массив результатов и завершаем promise
                full_table[i] = '<tr><td>' + table;
            });
    }

    //var urls = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' };
    var urls = { 1: 'https://club.directum.ru/questions' };

    // Обрабатываем каждый адрес из списка
    for (i in urls) getUrlTables(i, urls[i]);

    // Склеим все полученные таблицы в одну
    full_info = '<table>';
    for (i in urls) full_info += full_table[i];
    full_info += '</table>';

    // Имя файла будет формироваться из текущей даты и времени
    date = new Date;
    day = date.getDate();
    mon = date.getMonth() + 1;
    yr = date.getFullYear();
    hr = date.getHours();
    date_str = ((hr < 10 ? '0' : '') + hr) + '_' + ((day < 10 ? '0' : '') + day) + ((mon < 10 ? '-0' : '-') + mon) + '-' + yr;

    // Сохраняем результат
    fs.open("vrosts_" + date_str + ".txt", "w", 0644, function(err, file_handle) {
        if (!err) { fs.writeSync(file_handle, full_info, null, 'utf8'); }
    });
})();