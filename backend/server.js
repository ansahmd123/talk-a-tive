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

app.listen(PORT, console.log(`server started on port ${PORT}`));