const db = require('../config/dbConfig.js');

exports.getItems = (request, response) => {
    db.pool.query('SELECT * FROM m_item', (error, results) => {
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
            message: "Berhasil mengambil data semua item",
            data: results.rows
        });
    })
}

exports.addItem = (request, response) => {
    const name = request.body.name
    db.pool.query('SELECT * FROM m_item WHERE LOWER(name_item) = $1', [name.toLowerCase()], (error, results) => {
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
                message: "Nama item sudah ada"
            });
            return
        }
        db.pool.query('INSERT INTO m_item (name_item) VALUES ($1) RETURNING *', [name], (error, results) => {
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
                message: "Penambahan item Berhasil",
                data: results.rows[0]
            });
        })
    })
}

exports.deleteItem = (request, response) => {
    const name = request.body.name
    db.pool.query('SELECT * FROM m_item WHERE name_item = $1', [name], (error, results) => {
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
                message: "Item tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM m_item WHERE name_item = $1', [name], (error, results) => {
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
                message: "Berhasil menghapus item dengan nama : " + name
            });
        })
    })
}