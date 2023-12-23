const db = require('../config/dbConfig.js');
const statusCode = require('../config/statusCode.js');
const baseError = require("../middleware/error.js");

exports.getVersion = (request, response) => {
    const reqVersionSplit = request.body.version.split(".");

    db.pool.query("SELECT * FROM m_version", (error, results) => {
        baseError.handleError(error, response)

        var updateApps = false
        var message = "Aplikasi sudah version terbaru"

        let version = results[results.length - 1].android_version;
        let versionSplit = version.split(".");
        for (const index in versionSplit) { 
            let reqVersion = parseInt(reqVersionSplit[index])
            let version = parseInt(versionSplit[index])
            if (reqVersion < version) {
                updateApps = true
                message = "Update Aplikasi di Playstore"
            }
        }

        let  data = {
            new_version_apps: version,
            update_apps: updateApps,
            force_update: results[results.length - 1].force_update
        };
        let status = updateApps ? statusCode.update_aplication : statusCode.success
        response.status(status).json({
            code: status,
            message: message,
            data: data
        });
    })
}