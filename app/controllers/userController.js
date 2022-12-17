const db = require('../config/dbConfig.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/authConfig.js");

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
            data: results
        });
    })
}

exports.getUserById = (request, response) => {
    const id = parseInt(request.body.id)
    db.pool.query('SELECT * FROM user_apps WHERE id = ?', [id], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "User tidak ditemukan dengan id : " + id
            });
            return
        }
        response.json({
            code: 200,
            message: "Detail user ditemukan dengan id : "+ results[0].id +" dan nama : " + results[0].name,
            data: results[0]
        });
    })
}

exports.login = (request, response) => {
    const email = request.body.email
    const password = request.body.password
    db.pool.query('SELECT * FROM user_apps WHERE email = ? AND password = ?', [email, password], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "Email atau Password salah"
            });
            return
        }
        var token = jwt.sign({ id: email }, authConfig.secret, {
            expiresIn: 31536000 // 1 minute
        });
        response.json({
            code: 200,
            message: "Login Berhasil",
            data: results[0],
            session: token
        });
    })
}

exports.register = (request, response) => {
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    db.pool.query('SELECT * FROM user_apps WHERE email = ?', [email], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length != 0) {
            response.json({
                code: 401,
                message: "Email sudah pernah digunakan"
            });
            return
        }
        db.pool.query('INSERT INTO user_apps (name, email, password) VALUES (?, ?, ?)', [name, email, password], (error, results) => {
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
                data: results[0]
            });
        })
    })
}

exports.updateProfile = (request, response) => {
    const id = parseInt(request.body.id)
    const name = request.body.name
    const email = request.body.email
    const password = request.body.password
    db.pool.query('UPDATE user_apps SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, password, id], (error, results) => {
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
    db.pool.query('SELECT * FROM user_apps WHERE id = ?', [id], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "User tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM user_apps WHERE id = ?', [id], (error, results) => {
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
                message: "Berhasil menghapus data user dengan id : "+ id
            });
        })
    })
}

exports.getTotalCountAmplop = (request, response) => {
    const id_user = parseInt(request.body.id_user)
    db.pool.query('SELECT * FROM v_total_amplop WHERE id_user = ?', [id_user], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "Data dengan id user "+ id_user +" tidak ditemukan"
            });
            return
        }
        response.json({
            code: 200,
            message: "Total count user id : "+ id_user +" ditemukan",
            data: results
        });
    })
}

exports.getTotalCountDhuwit= (request, response) => {
    const id_user = parseInt(request.body.id_user)
    db.pool.query('SELECT * FROM v_total_dhuwit WHERE id_user = ?', [id_user], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "Data dengan id user "+ id_user +" tidak ditemukan"
            });
            return
        }
        response.json({
            code: 200,
            message: "Total count user id : "+ id_user +" ditemukan",
            data: results
        });
    })
}


exports.getTotalSpendDhuwitMonth= (request, response) => {
    const id_user = parseInt(request.body.id_user)
    const today = new Date()
    const month = today.getMonth() + 1

    db.pool.query('SELECT SUM(tr_dhuwit.nominal) AS `total_spend_month` FROM tr_dhuwit WHERE MONTH(tr_dhuwit.date_dhuwit) = ? AND id_user = ? AND status = 2', [month ,id_user], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "Data dengan id user "+ id_user +" tidak ditemukan"
            });
            return
        }
        response.json({
            code: 200,
            message: "Total bulan ini dengan user id : "+ id_user +" ditemukan",
            data: results[0]
        });
    })
}

exports.getTotalSpendDhuwitDay= (request, response) => {
    const id_user = parseInt(request.body.id_user)
    const date = request.body.date

    const from = date + " 00:00:00"
    const to = date + " 23:59:59"

    db.pool.query('SELECT SUM(tr_dhuwit.nominal) AS `total_spend_day` FROM tr_dhuwit WHERE tr_dhuwit.date_dhuwit BETWEEN ? AND ? AND id_user = ? AND status = 2', [from, to ,id_user], (error, results) => {
        if (error) {
            response.json({
                code: 400,
                message: error.message,
                error: error
            });
            return
        }
        if (results.length == 0) {
            response.json({
                code: 401,
                message: "Data dengan id user "+ id_user +" tidak ditemukan"
            });
            return
        }
        response.json({
            code: 200,
            message: "Total hari ini dengan user id : "+ id_user +" ditemukan",
            data: results[0]
        });
    })
}