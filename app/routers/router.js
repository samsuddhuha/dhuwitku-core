const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth.js");
// const upload = require("../middleware/upload.js");

const version = require('../controllers/versionController.js');
router.post('/api/version/apps', version.getVersion);

const authController = require('../controllers/authController.js');
router.post('/api/login', authController.login);
router.post('/api/register', authController.register);
 
const user = require('../controllers/userController.js');
router.get('/api/user/all', auth.verifyToken, user.getUsers);
router.post('/api/user/detail', auth.verifyToken, user.getUserById);
router.post('/api/user/delete', auth.verifyToken, user.deleteUser);
router.post('/api/user/updateprofile', auth.verifyToken, user.updateProfile);
router.post('/api/user/totalcountamplop', auth.verifyToken, user.getTotalCountAmplop);
router.post('/api/user/totalcountdhuwit', auth.verifyToken, user.getTotalCountDhuwit);
router.post('/api/user/totalmonthdhuwit', auth.verifyToken, user.getTotalSpendDhuwitMonth);
router.post('/api/user/totaldaydhuwit', auth.verifyToken, user.getTotalSpendDhuwitDay);

const item = require('../controllers/itemController.js');
router.get('/api/item/all', auth.verifyToken, item.getItems);
router.post('/api/item/add', item.addItem);
router.post('/api/item/delete', item.deleteItem);

const amplop = require('../controllers/amplopController.js');
router.post('/api/amplop/list', auth.verifyToken, amplop.getDataAmplop);
router.post('/api/amplop/detail', auth.verifyToken, amplop.getDetailAmplop);
router.post('/api/amplop/create', auth.verifyToken, amplop.createAmplop);
router.post('/api/amplop/delete', auth.verifyToken, amplop.deleteAmplop);
router.post('/api/amplop/update', auth.verifyToken, amplop.updateAmplop);

const dhuwit = require('../controllers/dhuwitController.js');
router.post('/api/dhuwit/list', auth.verifyToken, dhuwit.getDataDhuwit);
router.post('/api/dhuwit/create', auth.verifyToken, dhuwit.createDhuwit);
router.post('/api/dhuwit/delete', auth.verifyToken, dhuwit.deleteDhuwit);
router.post('/api/dhuwit/update', auth.verifyToken, dhuwit.updateDhuwit);

// const uploadController = require("../controllers/uploadController.js");
// router.post("/api/upload", auth.verifyToken, upload.single("file"), uploadController.upload);

module.exports = router;