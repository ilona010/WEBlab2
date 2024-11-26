const bcrypt = require('bcryptjs');

let users = [];

const addUser = async (username, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10); // Хешування пароля
    const newUser = { id: Date.now().toString(), username, password: hashedPassword, role };
    users.push(newUser);
    return newUser;
};

const findUserByUsername = (username) => users.find((u) => u.username === username);

module.exports = { addUser, findUserByUsername, users };
