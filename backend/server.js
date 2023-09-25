const express = require('express');
const dotenv = require('dotenv');
// const { chats } = require('./data/data');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middlewares/errorMiddleWare');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.get('/', (req, res) => {
    res.send("api running successfully")
})

// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// })

// app.get('/api/chat/:id', (req, res) => {
//     // res.send("page working");
//     // console.log(req.params.id)
//     const singleChat = chats.find((c) => c._id === req.params.id);
//     res.send(singleChat);
// })

//using this endpoint for all
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

//if goes on other than specified port
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`server started on port ${PORT}`));

// setting socket.io
const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    // console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        // console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users)
            return;

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        // console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});