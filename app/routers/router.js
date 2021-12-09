let express = require('express');
let router = express.Router();
let auth = require("../middleware/auth.js");
const upload = require("../middleware/upload.js");
 
const user = require('../controllers/userController.js');
router.post('/api/user/login', user.login);
router.post('/api/user/register', user.register);
router.get('/api/user/all', auth.verifyToken, user.getAllUser);
router.post('/api/user/detail', auth.verifyToken, user.getUserById);

const product = require('../controllers/productController.js');
router.get('/api/product/all', auth.verifyToken, product.getAllProduct);
router.post('/api/product/detail', auth.verifyToken, product.getProductById);
router.post('/api/product/create', auth.verifyToken, product.create);
router.post('/api/product/update', auth.verifyToken, product.updateById);

const uploadController = require("../controllers/uploadController.js");
router.post("/api/upload", auth.verifyToken, upload.single("file"), uploadController.upload);

// router.post('/api/customers/create', customers.create);
// router.get('/api/customers/all', customers.retrieveAllCustomers);
// router.get('/api/customers/onebyid/:id', customers.getCustomerById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;