const db = require('../config/dbConfig.js');
const { use } = require('../routers/router.js');
const User = db.User;

exports.getAllUser = (req, res) => {
    User.findAll()
        .then(user => {
            res.status(200).json({
                code: 200,
                message: "Successful get all user",
                data: user
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: "Error : " + error.message
            });
        });
}

exports.getUserById = (req, res) => {
    let userId = req.body.userId;
    User.findByPk(userId)
        .then(user => {
            res.status(200).json({
                code: 200,
                message: "Successful get user id " + userId,
                data: user
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                code: 500,
                message: "Error : " + error.message
            });
        });
}

exports.create = (req, res) => {
    let user = {};
    try{
        if (req.body.username == null || req.body.username == ""){
            res.status(501).json({
                code: 501,
                message: "Username can not be empty"
            });
            return
        }
        if (req.body.password == null || req.body.password == ""){
            res.status(501).json({
                code: 501,
                message: "Password can not be empty"
            });
            return
        }
        user.username = req.body.username;
        user.name = req.body.name;
        user.mail = req.body.mail;
        user.password = req.body.password;
    
        User.create(user).then(result => {    
            res.status(200).json({
                code: 200,
                message: "Successful create user " + user.mail
            });
        });
    }catch(error){
        res.status(500).json({
            code: 500,
            message: "Error : " + error.message
        });
    }
}

exports.login = (req, res) => {
    User.findOne({ where: { 
        username : req.body.username,
        password : req.body.password
    }})
    .then(user => {
        if (user == null){
            res.status(501).json({
                code: 501,
                message: "Username or password not incorrect"
            });
        }else{
            res.status(200).json({
                code: 200,
                message: "Login Successful",
                data: user
            });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error : " + error.message
        });
    });
}

