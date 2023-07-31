const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4005;
let runningMessage = "Server is running on port " + port;

app.use(express.static(path.resolve(`${__dirname}`, './')));

const server = app.listen(port, () => {
    console.log(runningMessage);
});

module.exports = server;