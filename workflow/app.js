const http = require('http');
const fs = require('fs');
const router = require('./router');

const server = http.createServer(router);

server.listen(3000);
