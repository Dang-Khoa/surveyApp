const queryString = require('querystring');
const https = require('https');
const { json } = require('body-parser');

module.exports = function(jsonData, callback){
    jsonData.token = process.env.REDCAP_TOKEN;
    jsonData.format = 'json';
    jsonData.returnFormat = 'json';
    
    var postData = queryString.stringify(jsonData);

    var options = {
        host: process.env.REDCAP_HOST,
        path: process.env.REDCAP_API_PATH,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    var buffer = '';
    var req = https.request(options, (res) => {
        // console.log('headers:', res.headers);
        console.log('statusCode:', res.statusCode);
        res.setEncoding('utf-8');

        res.on('data', (d) => {
            buffer += d;
        });
        
        res.on('end', () => {
            if (typeof ret === 'object' && 'error' in ret) {
                return callback(new Error(ret.error));
            }
            else if (buffer != '') {
                try {
                    data = JSON.parse(buffer);
                }
                catch(e) {
                    data = buffer;
                }
                if (data.error) {
                    return callback(data.error);
                }
                return callback(null, data);
            }
        });
    });

    req.on('error', (e) => {
        return callback(e);
    });

    req.write(postData);
    req.end();
};