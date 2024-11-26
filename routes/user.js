const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Доступно лише для адмінів
router.get('/admin', authMiddleware(['admin']), (req, res) => {
    res.send('Welcome, admin!');
});

// Доступно для всіх авторизованих
router.get('/profile', authMiddleware(), (req, res) => {
    res.json({ message: 'User profile', user: req.user });
});

module.exports = router;
