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
    let bets = []; 

    io.on("connection", (socket) => { 
        socket.on("join", (user) => { 
            if(!users.find(data => user.id == data.id)) {
                users.push(user);
            };

            socket.emit('connected', users, bets[bets.length - 1] ? bets[bets.length - 1].id : 'Fetching...')
            io.emit('update_users', users)
        });

        socket.on('disconnect', (userId) => { 
            users = users.filter(user => user !== userId);
        });
    });

    setInterval(() => {
        if(users.length === 0) return;

        let currentBet = {
            id: Math.floor(Math.random() * 1000000), 
            status: "Waiting"
        }; 

        // @ Register bet
        bets.push(currentBet); 

        console.log("emiting bet", currentBet)

        // @ Emit identifiers and waiting for bets
        io.emit("emit_bet", currentBet);

        // @ Emit bet result to clients
        setTimeout(() => {
            bets[bets.length - 1] = {
                ...bets[bets.length - 1],
                status: "Finished", 
                betResult: Math.floor(Math.random() * 36)
            };

            const finished_bet = bets.find(bet => bet.id === currentBet.id);

            console.log("emiting finished bet", finished_bet)

            io.emit("spin", finished_bet.betResult);
        }, 3000);
    }, 6000);

    return io;
}

module.exports = setupSocketIO;
