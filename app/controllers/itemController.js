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
            data: results
        });
    })
}

exports.addItem = (request, response) => {
    const name = request.body.name
    db.pool.query('SELECT * FROM m_item WHERE LOWER(name_item) = ?', [name.toLowerCase()], (error, results) => {
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
                message: "Nama item sudah ada"
            });
            return
        }
        db.pool.query('INSERT INTO m_item (name_item) VALUES (?)', [name], (error, results) => {
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
                data: results[0]
            });
        })
    })
}

exports.deleteItem = (request, response) => {
    const name = request.body.name
    db.pool.query('SELECT * FROM m_item WHERE name_item = ?', [name], (error, results) => {
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
                message: "Item tidak ditemukan"
            });
            return
        }
        db.pool.query('DELETE FROM m_item WHERE name_item = ?', [name], (error, results) => {
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