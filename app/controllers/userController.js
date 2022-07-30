const db = require('../config/dbConfig.js');
const bcrypt = require("bcryptjs");

const getUsers = (request, response) => {
    db.query('SELECT * FROM user_apps ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
}


  