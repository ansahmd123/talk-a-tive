const express = require('express');
const { registerUser2, authUser2, allUsers } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.route('/').post(registerUser2).get(protect, allUsers);
router.post('/login', authUser2);


module.exports = router;