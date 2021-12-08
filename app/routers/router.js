let express = require('express');
let router = express.Router();
 
// const customers = require('../controllers/customerController.js');
const user = require('../controllers/userController.js');
router.get('/api/user/all', user.getAllUser);
router.get('/api/user/detail', user.getUserById);
router.post('/api/user/login', user.login);
router.post('/api/user/create', user.create);

const product = require('../controllers/productController.js');
router.get('/api/product/all', product.getAllProduct);
router.get('/api/product/detail', product.getProductById);
router.post('/api/product/create', product.create);
router.post('/api/product/update', product.updateById);

// router.post('/api/customers/create', customers.create);
// router.get('/api/customers/all', customers.retrieveAllCustomers);
// router.get('/api/customers/onebyid/:id', customers.getCustomerById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;