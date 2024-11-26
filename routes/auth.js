const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { addUser, findUserByUsername } = require('../users');

const router = express.Router();

const SECRET_KEY = 'secretKey';

// Реєстрація
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).send('All fields are required.');

    if (findUserByUsername(username)) return res.status(400).send('User already exists.');

    const newUser = await addUser(username, password, role);
    res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
});

// Вхід
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);
    if (!user) return res.status(401).send('Invalid credentials.');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send('Invalid credentials.');

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
