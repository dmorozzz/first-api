const { createServer } = require('http');
const app = require('../api/app.js');

const server = createServer(app);
const dataBase = require('../database/mongodb.js');

const port = process.env.PORT || 3000;

dataBase.once('open', () => console.log('db connection open'));
dataBase.on('error', error => console.log(error));

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});