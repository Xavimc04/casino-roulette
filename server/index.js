const http = require("http");
const setupSocketIO = require("./controllers/websockets");

const httpServer = http.createServer();

const io = setupSocketIO(httpServer);

const PORT = process.env.SERVER_PORT || 3456;

httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
});
