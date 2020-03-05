const express = require('express');

const hostName = 'localhost';
const port = 3000;

const app = express();

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(`<html><body><h1>This is an Express Server.</h1></body></html>`);
});

app.listen(port, hostName, () => {
    console.log(`Express server running on http://${hostName}:${port}`);
});
