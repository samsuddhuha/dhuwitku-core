const db = require('../config/dbConfig.js');
const bcrypt = require("bcryptjs");

exports.getUsers = (request, response) => {
    db.pool.query('SELECT * FROM user_apps', (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        response.json({
            code: 200,
            message: "Berhasil mengambil data semua user",
            data: results.rows
        });
    })
}

exports.getUserById = (request, response) => {
    const id = parseInt(request.body.id)
    db.pool.query('SELECT * FROM user_apps WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.rows.length == 0) {
            response.json({
                code: 401,
                message: "User tidak ditemukan dengan id : " + id
            });
            return
        }
        response.json({
            code: 200,
            message: "Detail user ditemukan dengan id : " + results.rows[0].id + " dan nama : " + results.rows[0].name,
            data: results.rows[0]
        });
    })
}

exports.login = (request, response) => {
    const email = request.body.email
    const password = request.body.password
    db.pool.query('SELECT * FROM user_apps WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.rows.length == 0) {
            response.json({
                code: 401,
                message: "Email atau Password salah"
            });
            return
        }
        response.json({
            code: 200,
            message: "Login Berhasil",
            data: results.rows[0]
        });
    })
}

exports.register = (request, response) => {
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    db.pool.query('SELECT * FROM user_apps WHERE email = $1', [email], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.rows.length != 0) {
            response.json({
                code: 401,
                message: "Email sudah pernah digunakan"
            });
            return
        }
        db.pool.query('INSERT INTO user_apps (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
            if (error) {
                response.json({
                    code: 400,
                    message: error.message,
                    error: error
                });
                return
            }
            response.json({
                code: 200,
                message: "Pendaftaran Berhasil",
                data: results.rows[0]
            });
        })
    })
}

exports.updateProfile = (request, response) => {
    const id = parseInt(request.body.id)
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    db.pool.query('UPDATE user_apps SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, password, id], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        response.json({
            code: 200,
            message: "Update profile Berhasil",
            data: results
        });
    })
}

exports.deleteUser = (request, response) => {
    const id = parseInt(request.body.id)
    db.pool.query('SELECT * FROM user_apps WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.rows.length == 0) {
            response.json({
                code: 401,
                message: "User tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM user_apps WHERE id = $1', [id], (error, results) => {
            if (error) {
                response.json({
                    code: 400,
                    message: error.message,
                    error: error
                });
                return
            }
            response.json({
                code: 200,
                message: "Berhasil menghapus data user dengan id : " + id
            });
        })
    })
}



  