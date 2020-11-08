const { createServer } = require('http');
const app = require('../src/app.js');

const server = createServer(app);

const port = process.env.PORT || 3000  ;

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});