const express = require('express');
const app = express();
const port = process.env.PORT || 4005;
let runningMessage = 'Every day we stray further from port ' + port;

app.get('/', (req, res) => {
    // console.log('API was successfully requested. Wanna fight about it?');
    // console.log(res);
    res.send(runningMessage);
});

const server = app.listen(port, () => {
    console.log(runningMessage);
});

module.exports = server;

