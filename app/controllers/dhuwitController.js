const db = require('../config/dbConfig.js');

exports.createDhuwit = (request, response) => {
    const id_user = request.body.id_user
    const date_dhuwit = request.body.date_dhuwit
    const nominal = request.body.nominal
    const status = request.body.status
    const information = request.body.information
    db.pool.query('INSERT INTO tr_dhuwit (id_user, date_dhuwit, nominal, status, information) VALUES (?, ?, ?, ?, ?)', 
    [id_user, date_dhuwit, nominal, status, information], (error, results) => {
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
            message: "Hore penambahan data dhuwit Berhasil",
            data: results[0]
        });
    })
}

exports.getDataDhuwit = (request, response) => {
    const id_user = request.body.id_user
    db.pool.query('SELECT id, id_user, date_dhuwit, nominal, status, information, created_at, updated_at FROM tr_dhuwit WHERE id_user = ?', [id_user], (error, results) => {
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
            message: "Berhasil mengambil data dhuwit user id : "+ id_user,
            data: results
        });
    })
}

exports.updateDhuwit = (request, response) => {
    const id = request.body.id
    const id_user = request.body.id_user
    const date_dhuwit = request.body.date_dhuwit
    const nominal = request.body.nominal
    const status = request.body.status
    const information = request.body.information
    db.pool.query('UPDATE tr_dhuwit SET id_user=?, date_dhuwit=?, nominal=?, status=?, information=? WHERE id = ? ORDER BY date_dhuwit', 
    [id_user, date_dhuwit, nominal, status, information, id], (error, results) => {
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
            message: "Upate data dhuwit Berhasil",
            data: results[0]
        });
    })
}

exports.deleteDhuwit = (request, response) => {
    const id = request.body.id
    db.pool.query('SELECT * FROM tr_dhuwit WHERE id = ?', [id], (error, results) => {
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
                message: "Data dhuwit tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM tr_dhuwit WHERE id = ?', [id], (error, results) => {
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
                message: "Berhasil menghapus data dhuwit"
            });
        })
    })
}