const express = require('express');
const router = express.Router();
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController');

// Bringing in the route protect function
const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
// Protecting the "getMe" route
router.get('/me', protect, getMe);

module.exports = router;
