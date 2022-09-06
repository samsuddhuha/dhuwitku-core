const db = require('../config/dbConfig.js');

exports.getDataNgamplop = (request, response) => {
    const id_user = request.body.id_user
    db.pool.query('SELECT a.id, a.id_user, a.id_item, b.name_item, a.name, a.origin, a.date_ngamplop, a.nominal, a.status, a.information, a.created_at, a.updated_at  FROM tr_ngamplop a LEFT JOIN m_item b ON a.id_item = b.id_item WHERE id_user = ?', [id_user], (error, results) => {
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
            message: "Berhasil mengambil data ngamplop user id : "+ id_user,
            data: results
        });
    })
}

exports.getDetailNgamplop = (request, response) => {
    const id = request.body.id
    db.pool.query('SELECT a.id, a.id_user, a.id_item, b.name_item, a.name, a.origin, a.date_ngamplop, a.nominal, a.status, a.information, a.created_at, a.updated_at  FROM tr_ngamplop a LEFT JOIN m_item b ON a.id_item = b.id_item WHERE a.id = ?', [id], (error, results) => {
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
                message: "Data detail ngamplop tidak ditemukan"
            });
            return
        }
        response.json({
            code: 200,
            message: "Berhasil mengambil data detail ngamplop  id : "+ id,
            data: results[0]
        });
    })
}

exports.createNgamplop = (request, response) => {
    const id_user = request.body.id_user
    const id_item = request.body.id_item
    const name = request.body.name
    const origin = request.body.origin
    const date_ngamplop = request.body.date_ngamplop
    const nominal = request.body.nominal
    const status = request.body.status
    const information = request.body.information
    db.pool.query('INSERT INTO tr_ngamplop (id_user, id_item, name, origin, date_ngamplop, nominal, status, information) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [id_user, id_item, name, origin, date_ngamplop, nominal, status, information], (error, results) => {
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
            message: "Hore penambahan data ngamplop Berhasil",
            data: results[0]
        });
    })
}

exports.updateNgamplop = (request, response) => {
    const id = request.body.id
    const id_user = request.body.id_user
    const id_item = request.body.id_item
    const name = request.body.name
    const origin = request.body.origin
    const date_ngamplop = request.body.date_ngamplop
    const nominal = request.body.nominal
    const status = request.body.status
    const information = request.body.information
    db.pool.query('UPDATE tr_ngamplop SET id_user=?, id_item=?, name=?, origin=?, date_ngamplop=?, nominal=?, status=?, information=? WHERE id = ?', 
    [id_user, id_item, name, origin, date_ngamplop, nominal, status, information, id], (error, results) => {
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
            message: "Upate data ngamplop Berhasil",
            data: results[0]
        });
    })
}

exports.deleteNgamplop = (request, response) => {
    const id = request.body.id
    db.pool.query('SELECT * FROM tr_ngamplop WHERE id = ?', [id], (error, results) => {
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
                message: "Data ngamplop tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM tr_ngamplop WHERE id = ?', [id], (error, results) => {
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
                message: "Berhasil menghapus data ngamplop"
            });
        })
    })
}

