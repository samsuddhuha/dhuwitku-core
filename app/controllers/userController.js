const db = require('../config/dbConfig.js');
const bcrypt = require("bcryptjs");

exports.getUsers = (request, response) => {
    db.pool.query('SELECT * FROM user_apps', (error, results) => {
        if (error) {
            response.json({
                status: 401,
                message: error.message,
                error: error
            });
        }
        response.json({
            status: 200,
            message: "User Added successfully",
            data: results.rows
        });
    })
}



  