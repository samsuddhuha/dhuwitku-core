const db = require('../config/dbConfig.js');
const { use } = require('../routers/router.js');
const Product = db.Product;

exports.getAllProduct = (req, res) => {
    Product.findAll()
        .then(product => {
            res.status(200).json({
                code: 200,
                message: "Successful get all product",
                data: product
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

exports.getProductById = (req, res) => {
    let id = req.body.id;
    Product.findByPk(id)
        .then(product => {
            res.status(200).json({
                code: 200,
                message: "Successful get detail product " + product.name,
                data: product
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
    let productTemp = {};
    try{
        productTemp.userId = req.body.userId;
        productTemp.name = req.body.name;
        productTemp.description = req.body.description;
        productTemp.price = req.body.price;
        productTemp.image = req.body.image;
        productTemp.purchasePrice = req.body.purchasePrice;
        productTemp.stock = req.body.stock;
        productTemp.active = req.body.active;
        productTemp.sold = req.body.sold;

        Product.create(productTemp).then(result => {    
            res.status(200).json({
                code: 200,
                message: "Successful create product " + productTemp.name,
                data: result
            });
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            code: 500,
            message: "Error : " + error.message
        });
    }
}

exports.updateById = async (req, res) => {
    let productTemp = {};
    try{
        let productId = req.body.id;
        let product = await Product.findByPk(productId);
    
        if(!product){
            // return a response to client
            res.status(501).json({
                code: 500,
                message: "Not Found for updating a product name : " + req.body.name
            });
        } else {    
            // update new change to database
            productTemp.name = req.body.name;
            productTemp.description = req.body.description;
            productTemp.price = req.body.price;
            productTemp.purchasePrice = req.body.purchasePrice;
            productTemp.stock = req.body.stock;
            productTemp.active = req.body.active;
            productTemp.sold = req.body.sold;
            let result = await Product.update(productTemp, {returning: true, where: {id: productId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    code: 500,
                    message: "Error Can not update a product with name : " + req.body.name
                });
            }

            res.status(200).json({
                code: 200,
                message: "Update successful a product with name : " + req.body.name,
                data: req.body,
            });
        }
    } catch(error){
        res.status(500).json({
            code: 500,
            message: "Error : Can not update a product with name : " + req.body.name,
            error: error.message
        });
    }
}