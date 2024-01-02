const { Server } = require("socket.io");

function setupSocketIO(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    let users = []; 

    io.on("connection", (socket) => { 
        socket.on("join", (user) => { 
            if(!users.find(data => user.id == data.id)) {
                users.push(user);
            };

            socket.emit('connected', users)
            io.emit('update_users', users)
        });

        socket.on('disconnect', (userId) => {
            console.log('disconnected', userId)
            users = users.filter(user => user !== userId);
        });
    });

    setInterval(() => {
        if(users.length === 0) return;

        console.log("Spinning the wheel")

        io.emit("spin");
    }, 30000);

    return io;
}

module.exports = setupSocketIO;
