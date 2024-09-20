// const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI,
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//                 // useFindAndModify: true
//             });
//         console.log(`MongoDb connected:${conn.connection.host}`)
//     } catch (error) {
//         console.log(`Error:${error.message}`);
//         process.exit();
//     }
// }

// module.exports = connectDB;

//local db
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mernchatapp');
        console.log("DB connected")
    } catch (error) {
        handleError(error);
    }
}
module.exports = connectDB;