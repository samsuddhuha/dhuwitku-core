let express = require('express');
let router = express.Router();
let auth = require("../middleware/auth.js");
// const upload = require("../middleware/upload.js");
 
const user = require('../controllers/userController.js');
router.get('/api/user/all', auth.verifyToken, user.getUsers);
router.post('/api/user/detail', auth.verifyToken, user.getUserById);
router.post('/api/user/delete', auth.verifyToken, user.deleteUser);
router.post('/api/user/updateprofile', auth.verifyToken, user.updateProfile);
router.post('/api/user/totalcount', auth.verifyToken, user.getTotalCount);

router.post('/api/login', user.login);
router.post('/api/register', user.register);


const item = require('../controllers/itemController.js');
router.get('/api/item', auth.verifyToken, item.getItems);
router.post('/api/item/add', item.addItem);
router.post('/api/item/delete', item.deleteItem);


const ngamplop = require('../controllers/ngamplopController.js');
router.post('/api/ngamplop', auth.verifyToken, ngamplop.getDataNgamplop);
router.post('/api/ngamplop/detail', auth.verifyToken, ngamplop.getDetailNgamplop);
router.post('/api/ngamplop/create', auth.verifyToken, ngamplop.createNgamplop);
router.post('/api/ngamplop/delete', auth.verifyToken, ngamplop.deleteNgamplop);
router.post('/api/ngamplop/update', auth.verifyToken, ngamplop.updateNgamplop);

// const uploadController = require("../controllers/uploadController.js");
// router.post("/api/upload", auth.verifyToken, upload.single("file"), uploadController.upload);

module.exports = router;