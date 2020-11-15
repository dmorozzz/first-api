const { createServer } = require('http');
const app = require('../api/app.js');

const server = createServer(app);
const dataBase = require('../database/mongodb.js');

const port = process.env.PORT || 3000;

const startServer = () => {
    server.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}

dataBase.once('open', startServer);
dataBase.on('error', error => { 
    throw error;
});



