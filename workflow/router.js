const fs = require('fs');

module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write(`
            <html>
                <head>
                    <title>Enter message</title>
                </head>
                <body>
                    <form action="/message" method="POST">
                        <input type="text" name="message"/>
                        <button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, error => {
                res.writeHead(302, {
                    'Location': '/'
                });
                return res.end();
            });
        });
    }
    res.write(`
            <html>
                <head>
                    <title>Start page</title>
                </head>
                <body>
                    <h1>Test</h1>
                </body>
            </html>
        `);
    res.end();
}