let express = require('express');
let router = express.Router();
let auth = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
 
const user = require('../controllers/userController.js');
router.get('/api/user/all', user.getUsers);
router.post('/api/user/detail', user.getUserById);
router.post('/api/user/delete', user.deleteUser);
router.post('/api/user/updateprofile', user.updateProfile);

router.post('/api/login', user.login);
router.post('/api/register', user.register);


const item = require('../controllers/itemController.js');
router.post('/api/item/add', item.addItem);
router.post('/api/item/delete', item.deleteItem);


const ngamplop = require('../controllers/ngamplopController.js');
router.post('/api/ngamplop/data', ngamplop.getDataNgamplop);
router.post('/api/ngamplop/detail', ngamplop.getDetailNgamplop);
router.post('/api/ngamplop/create', ngamplop.createNgamplop);
router.post('/api/ngamplop/delete', ngamplop.deleteNgamplop);
router.post('/api/ngamplop/update', ngamplop.updateNgamplop);

// const uploadController = require("../controllers/uploadController.js");
// router.post("/api/upload", auth.verifyToken, upload.single("file"), uploadController.upload);

module.exports = router;