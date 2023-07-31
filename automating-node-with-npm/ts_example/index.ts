import express from 'express';

const app = express();
const port = process.env.npm_package_config_port || 4005;
let runningMessage = "Let's all meet up in the port " + port;

app.get('/', (req, res) => {
    console.log('API was successfully requested');
    res.send(runningMessage + ", won't it be strange when we're all fully grown.");
});

const server = app.listen(port, () => {
    console.log(runningMessage + ' ya filthy animal!');
});

module.exports = server;

