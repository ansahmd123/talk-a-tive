const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

//signup
// const registerUser = asyncHandler(async (req, res) => {
//     const { name, email, password, pic } = req.body;

//     if (!name || !email || !password) {
//         res.status(400);
//         throw new Error("Please enter all the fields");
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400);
//         throw new Error("User Already Exists...")
//     }

//     // const salt = await bcrypt.genSalt(10);
//     // const secPass = await bcrypt.hash(password, salt);

//     const user = await User.create({
//         name, email, password, pic
//     })

//     // const user = await User.create({
//     //     name, email,
//     //     password: secPass,
//     //     pic: pic
//     // });

//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id)
//             // token: jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET)
//         })
//     } else {
//         res.status(400);
//         throw new Error("Failed to create the user");
//     }
// })

const registerUser2 = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    // check whether the user with email exist or not
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    let userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists...")
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.create({
        name, email,
        password: secPass,
        pic: pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            // token: generateToken(user._id)
            token: jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET)
        })
    }
    else {
        res.status(400);
        throw new Error("Failed to create the user");

    }
});

//login
// const authUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//         res.status(401);
//         throw new Error("Email is not registered with us!")
//     }
//     else if (user && (await user.matchPassword(password))) {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             pic: user.pic,
//             token: generateToken(user._id)
//         })

//     } else {
//         res.status(401);
//         throw new Error("Invalid Password")
//     }
// })

const authUser2 = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Email is not registered with us!")
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
            // token: jwt.sign(user._id, process.env.JWT_SECRET)
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid Password")
    }
})


//using get : search(variable) using query in address : /api/user?search=anas
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],
    } : {}

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
})

// module.exports = { registerUser, authUser, allUsers }
module.exports = { registerUser2, authUser2, allUsers } 