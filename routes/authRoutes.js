const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Route login
router.post('/login', auth.login);

// Route register
router.post('/register', auth.register);

module.exports = router;
