const db = require('../config/dbConfig.js');
const authConfig = require("../config/authConfig.js");
const { use } = require('../routers/router.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
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

exports.register = (req, res) => {
    let userTemp = {};
    try{
        User.findOne({ where: { 
            username : req.body.username
        }})
        .then(user => {
            if (user != null){
                res.status(501).json({
                    code: 501,
                    message: "Username is already in use."
                });
                return
                
            }
            User.findOne({ where: { 
                email : req.body.email
            }})
            .then(user => {
                if (user != null){
                    res.status(501).json({
                        code: 501,
                        message: "Email is already in use."
                    });
                    return
                }
                if(req.body.password.length < 8){
                    res.status(501).json({
                        code: 501,
                        message: "Kata sandi minimal 8 karakter."
                    });
                    return
                }
                userTemp.username = req.body.username;
                userTemp.name = req.body.name;
                userTemp.email = req.body.email;
                userTemp.password = bcrypt.hashSync(req.body.password, 8);

                User.create(userTemp).then(result => {    
                    res.status(200).json({
                        code: 200,
                        message: "Successful create user " + userTemp.email,
                        data: result
                    });
                });
            })
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error : " + error.message
        });
    }
}

exports.login = (req, res) => {
    User.findOne({ where: { 
        username : req.body.username
    }})
    .then(user => {
        if (user == null){
            res.status(501).json({
                code: 501,
                message: "Username not found"
            });
            return
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (passwordIsValid) {
            var token = jwt.sign({ id: user.username }, authConfig.secret, {
                // expiresIn: 60 // 1 minute
            });
        
            res.status(200).json({
                code: 200,
                message: "Login Successful",
                data: user,
                session: token
            });
        }else{
            res.status(501).json({
                code: 501,
                message: "Password not correct"
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